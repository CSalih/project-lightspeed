import { describe, expect, it } from "vitest";
import { type SessionToken, SSOSessionManager } from "../lib/auth-sso";
import { calculateBilling } from "../lib/billing";
import {
	type LegacyCustomerRecord,
	type ModernPresentationRecord,
	validateDataIntegrity,
} from "../lib/data-integrity";
import { processQuarterlyReport } from "../lib/insights";
import {
	dispatchOutageAlerts,
	type UserSession,
	validateGridFailurePayload,
} from "../lib/outages";
import { runHighTrafficSimulation } from "../lib/performance-simulator";
import { type TariffState, transitionTariff } from "../lib/tariffs";

describe("FR1 (Billing) - Billing Calculation & Breakdown Validation", () => {
	it("should calculate standard tariff breakdown correctly", () => {
		const result = calculateBilling({ kwh: 350, tariffType: "Standard" });
		// Standard: consumption = 350 * 0.24 = 84.00
		// Grid: base (7.55) + 350 * 0.05 (17.50) = 25.05
		// Taxes: (84.00 + 25.05) * 0.12 = 13.09
		// Total: 84.00 + 25.05 + 13.09 = 122.14
		expect(result.consumptionCharges).toBe(84.0);
		expect(result.gridCharges).toBe(25.05);
		expect(result.taxes).toBe(13.09);
		expect(result.amount).toBe(122.14);
	});

	it("should calculate EV tariff breakdown with discount correctly", () => {
		const result = calculateBilling({
			kwh: 200,
			tariffType: "EV",
			discounts: 5.0,
		});
		// EV: consumption = 200 * 0.18 = 36.00
		// Grid: base (10.00) + 200 * 0.04 (8.00) = 18.00
		// Taxes: (36.00 + 18.00) * 0.12 = 6.48
		// Total: 36.00 + 18.00 + 6.48 - 5.00 = 55.48
		expect(result.consumptionCharges).toBe(36.0);
		expect(result.gridCharges).toBe(18.0);
		expect(result.taxes).toBe(6.48);
		expect(result.amount).toBe(55.48);
	});

	it("should handle boundary value of 0 kWh correctly", () => {
		const result = calculateBilling({ kwh: 0, tariffType: "Standard" });
		expect(result.consumptionCharges).toBe(0.0);
		expect(result.gridCharges).toBe(7.55); // base grid fee
		expect(result.taxes).toBe(0.91); // 7.55 * 0.12 = 0.906 -> 0.91
		expect(result.amount).toBe(8.46);
	});

	it("should handle extremely high industrial usage correctly", () => {
		const result = calculateBilling({ kwh: 50000, tariffType: "Industrial" });
		// Industrial: consumption = 50000 * 0.12 = 6000.00
		// Grid: base (50.00) + 50000 * 0.02 (1000.00) = 1050.00
		// Taxes: (6000.00 + 1050.00) * 0.12 = 846.00
		// Total: 6000.00 + 1050.00 + 846.00 = 7896.00
		expect(result.consumptionCharges).toBe(6000.0);
		expect(result.gridCharges).toBe(1050.0);
		expect(result.taxes).toBe(846.0);
		expect(result.amount).toBe(7896.0);
	});

	it("should throw an exception for negative inputs", () => {
		expect(() =>
			calculateBilling({ kwh: -10, tariffType: "Standard" }),
		).toThrow("Consumption (kWh) cannot be negative");
	});
});

describe("FR2 (Outages) - Proactive Outage Alert Triggering", () => {
	const mockUsers: UserSession[] = [
		{ id: "USR-01", name: "Alice", nodeId: "NODE-A", phoneNumber: "+15550101" },
		{ id: "USR-02", name: "Bob", nodeId: "NODE-B", phoneNumber: "+15550102" },
		{
			id: "USR-03",
			name: "Charlie",
			nodeId: "NODE-A",
			phoneNumber: "+15550103",
		},
	];

	it("should dispatch notifications only to correct users mapped to the affected node", () => {
		const payload = {
			nodeId: "NODE-A",
			area: "Downtown",
			timestamp: "2026-06-25T10:00:00Z",
			estimatedFixTime: "2026-06-25T12:00:00Z",
			reason: "Equipment Upgrade",
		};

		const validated = validateGridFailurePayload(payload);
		const alerts = dispatchOutageAlerts(
			validated,
			mockUsers,
			new Date("2026-06-25T10:00:30Z"),
		);

		expect(alerts).toHaveLength(2);
		expect(alerts[0].userId).toBe("USR-01");
		expect(alerts[1].userId).toBe("USR-03");
		expect(alerts.every((a) => a.message.includes("Downtown"))).toBe(true);
	});

	it("should reject corrupted/invalid grid failure signals", () => {
		expect(() => validateGridFailurePayload(null)).toThrow("Invalid payload");
		expect(() => validateGridFailurePayload({ area: "Suburbs" })).toThrow(
			"missing or invalid nodeId",
		);
		expect(() =>
			validateGridFailurePayload({
				nodeId: "NODE-A",
				area: "Suburbs",
				timestamp: "invalid-date",
			}),
		).toThrow("missing or invalid timestamp");
	});

	it("should verify latency does not exceed the 60-second threshold", () => {
		const payload = {
			nodeId: "NODE-B",
			area: "Westside",
			timestamp: "2026-06-25T12:00:00Z",
			estimatedFixTime: "2026-06-25T15:00:00Z",
		};

		// Within 60 seconds (30s latency)
		const alertsOk = dispatchOutageAlerts(
			payload,
			mockUsers,
			new Date("2026-06-25T12:00:30Z"),
		);
		expect(alertsOk[0].latencySeconds).toBe(30);
		expect(alertsOk[0].latencySeconds).toBeLessThanOrEqual(60);

		// Latency exceeded (90s latency)
		const alertsFail = dispatchOutageAlerts(
			payload,
			mockUsers,
			new Date("2026-06-25T12:01:30Z"),
		);
		expect(alertsFail[0].latencySeconds).toBe(90);
		expect(alertsFail[0].latencySeconds).toBeGreaterThan(60);
	});
});

describe("FR3 (Tariffs) - Tariff State Transition & Configuration", () => {
	it("should smoothly transition valid configurations and update database", () => {
		const current: TariffState = { basePlan: "Standard", addons: [] };
		const target: TariffState = {
			basePlan: "EV",
			addons: ["Overnight-EV-Discount"],
		};
		let dbUpdated = false;

		const result = transitionTariff(current, target, (updated) => {
			dbUpdated = true;
			expect(updated).toEqual(target);
		});

		expect(result.success).toBe(true);
		expect(result.emailTriggered).toBe(true);
		expect(dbUpdated).toBe(true);
	});

	it("should block invalid transitions due to plan dependencies", () => {
		const current: TariffState = { basePlan: "Standard", addons: [] };
		// Overnight-EV-Discount requires EV basePlan, but target basePlan is Standard
		const target: TariffState = {
			basePlan: "Standard",
			addons: ["Overnight-EV-Discount"],
		};

		const result = transitionTariff(current, target, () => {});
		expect(result.success).toBe(false);
		expect(result.error).toContain("requires one of the following base plans");
	});

	it("should block invalid transitions due to mutually exclusive add-ons", () => {
		const current: TariffState = { basePlan: "Industrial", addons: [] };
		// Solar and Industrial-High-Yield are mutually exclusive
		const target: TariffState = {
			basePlan: "Industrial",
			addons: ["Solar", "Industrial-High-Yield"],
		};

		const result = transitionTariff(current, target, () => {});
		expect(result.success).toBe(false);
		expect(result.error).toContain("mutually exclusive");
	});
});

describe("FR4 (Insights) - Quarterly Market Report Rendering", () => {
	it("should render clean quarterly reports correctly", () => {
		const data = [
			{ month: "Jan", price: 0.15, volume: 1000 },
			{ month: "Feb", price: 0.16, volume: 1100 },
			{ month: "Mar", price: 0.14, volume: 1050 },
		];

		const report = processQuarterlyReport(data);
		expect(report.hasMissingData).toBe(false);
		expect(report.averages.price).toBe(0.15);
		expect(report.averages.volume).toBe(1050);
	});

	it("should adjust February volumes during a leap year", () => {
		const data = [{ month: "Feb", price: 0.2, volume: 2800 }];
		const report = processQuarterlyReport(data, true); // isLeapYear = true
		// 2800 * (29 / 28) = 2900
		expect(report.data[0].volume).toBe(2900);
	});

	it("should handle missing data points gracefully without crashing", () => {
		const data = [
			{ month: "Jan", price: 0.18, volume: null },
			{ month: "Feb", price: null, volume: 1200 },
			{ month: "Mar", price: 0.22, volume: 1300 },
		];

		const report = processQuarterlyReport(data);
		expect(report.hasMissingData).toBe(true);
		expect(report.data[0].volume).toBeNull();
		expect(report.data[1].price).toBeNull();
		// averages should ignore missing elements:
		// price avg = (0.18 + 0.22) / 2 = 0.20
		// volume avg = (1200 + 1300) / 2 = 1250
		expect(report.averages.price).toBe(0.2);
		expect(report.averages.volume).toBe(1250);
	});
});

describe("FR5 (Support) - Centralized Portal Access & SSO", () => {
	it("should grant access with a valid, active session token", () => {
		const sso = new SSOSessionManager();
		const validToken: SessionToken = {
			token: "active-token",
			expiresAt: Date.now() + 10000,
			userModules: ["billing", "tariffs", "outages"],
		};
		sso.startSession(validToken);

		const billingAccess = sso.checkAccess("billing");
		const tariffAccess = sso.checkAccess("tariffs");

		expect(billingAccess.allowed).toBe(true);
		expect(tariffAccess.allowed).toBe(true);
		expect(sso.getRedirectCount()).toBe(0);
	});

	it("should deny access and redirect if the session token is expired", () => {
		const sso = new SSOSessionManager();
		const expiredToken: SessionToken = {
			token: "expired-token",
			expiresAt: Date.now() - 5000,
			userModules: ["billing"],
		};
		sso.startSession(expiredToken);

		const access = sso.checkAccess("billing");

		expect(access.allowed).toBe(false);
		expect(access.redirectToLogin).toBe(true);
		expect(access.error).toBe("Session expired");
		expect(sso.getRedirectCount()).toBe(1);
	});

	it("should deny access without redirecting to login for unauthorized modules", () => {
		const sso = new SSOSessionManager();
		const token: SessionToken = {
			token: "auth-token",
			expiresAt: Date.now() + 10000,
			// User does not have access to "tariffs"
			userModules: ["billing", "outages"],
		};
		sso.startSession(token);

		const access = sso.checkAccess("tariffs");

		expect(access.allowed).toBe(false);
		expect(access.redirectToLogin).toBe(false);
		expect(access.error).toContain("Unauthorized access");
		expect(sso.getRedirectCount()).toBe(0); // No login redirect triggered
	});
});

describe("NFR-Perf (Performance) - High-Traffic Outage Load Test", () => {
	it("should pass performance criteria with < 2.0s latency and 100% uptime under regular limits", () => {
		// Simulate 1,000 concurrent users performing 5 requests each
		const report = runHighTrafficSimulation(1000, 5, 100, 5000);

		expect(report.uptimePercent).toBe(100);
		expect(report.latencyP99Ms).toBeLessThan(2000); // 2.0 seconds
		expect(report.meetsPassCriteria).toBe(true);
	});

	it("should fail performance criteria when system degrades under severe load", () => {
		// Simulate 12,000 concurrent users (well above threshold)
		const report = runHighTrafficSimulation(12000, 5, 200, 5000);

		// Either latency spikes above 2000ms or some connections fail (uptime < 100%)
		expect(report.meetsPassCriteria).toBe(false);
	});
});

describe("NFR-Qual (Correctness) - Data Integrity Check", () => {
	const legacyRecords: LegacyCustomerRecord[] = [
		{
			cust_id_legacy: "CUST-1001",
			full_name: "Alice Smith",
			tar_cd: "STD-2026",
			hist_consumption_kwh: "1245.55",
			encoding_check: "Standard green plan",
		},
		{
			cust_id_legacy: "CUST-1002",
			full_name: "Bob Jones",
			tar_cd: "EV-NIGHT",
			hist_consumption_kwh: "5420.00",
			encoding_check: "Eco-savings -- carbon offsets included",
		},
	];

	const modernRecords: ModernPresentationRecord[] = [
		{
			id: "CUST-1001",
			name: "Alice Smith",
			tariffCode: "STD-2026",
			consumptionHistoryKwh: 1245.55,
		},
		{
			id: "CUST-1002",
			name: "Bob Jones",
			tariffCode: "EV-NIGHT",
			consumptionHistoryKwh: 5420.0,
		},
	];

	it("should pass data integrity check with 100% data fidelity", () => {
		const result = validateDataIntegrity(legacyRecords, modernRecords);
		expect(result.success).toBe(true);
		expect(result.mismatchedCount).toBe(0);
	});

	it("should fail validation and list errors for mismatched user details or truncation", () => {
		const badModernRecords = [
			{
				id: "CUST-1001",
				name: "Alice Smith",
				tariffCode: "STD-2026",
				consumptionHistoryKwh: 1245.5, // truncated precision (1245.5 instead of 1245.55)
			},
			{
				id: "CUST-1002",
				name: "Bobby Jones", // mismatched name
				tariffCode: "EV-NIGHT",
				consumptionHistoryKwh: 5420.0,
			},
		];

		const result = validateDataIntegrity(legacyRecords, badModernRecords);
		expect(result.success).toBe(false);
		expect(result.mismatchedCount).toBe(2);
		expect(result.errors[0]).toContain("Numeric precision loss");
		expect(result.errors[1]).toContain("does not match Modern name");
	});

	it("should detect character encoding corruption errors in legacy data", () => {
		const corruptedLegacy = [
			{
				cust_id_legacy: "CUST-1001",
				full_name: "Alice Smith",
				tar_cd: "STD-2026",
				hist_consumption_kwh: "1245.55",
				// Contains unicode replacement character (indicates encoding fail)
				encoding_check: "Standard green plan \uFFFD energy",
			},
		];

		const singleModern = [modernRecords[0]];

		const result = validateDataIntegrity(corruptedLegacy, singleModern);
		expect(result.success).toBe(false);
		expect(result.errors[0]).toContain("Character encoding error detected");
	});
});
