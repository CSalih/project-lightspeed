export interface BillingDetails {
	kwh: number;
	tariffType: "Standard" | "EV" | "Industrial";
	discounts?: number;
}

export interface BillingBreakdown {
	consumptionCharges: number;
	gridCharges: number;
	taxes: number;
	discounts: number;
	amount: number;
}

/**
 * Calculates the billing breakdown based on the tariff type and consumption (kWh).
 */
export function calculateBilling(details: BillingDetails): BillingBreakdown {
	const { kwh, tariffType, discounts = 0 } = details;

	if (kwh < 0) {
		throw new Error("Consumption (kWh) cannot be negative");
	}

	let ratePerKwh = 0.24;
	let gridRatePerKwh = 0.05;
	let baseGridFee = 7.55;
	const taxRate = 0.12;

	if (tariffType === "EV") {
		ratePerKwh = 0.18;
		gridRatePerKwh = 0.04;
		baseGridFee = 10.0;
	} else if (tariffType === "Industrial") {
		ratePerKwh = 0.12;
		gridRatePerKwh = 0.02;
		baseGridFee = 50.0;
	}

	const consumptionCharges = kwh * ratePerKwh;
	const gridCharges = baseGridFee + kwh * gridRatePerKwh;
	const taxes = (consumptionCharges + gridCharges) * taxRate;

	const amount = Math.max(
		0,
		consumptionCharges + gridCharges + taxes - discounts,
	);

	return {
		consumptionCharges: Number(consumptionCharges.toFixed(2)),
		gridCharges: Number(gridCharges.toFixed(2)),
		taxes: Number(taxes.toFixed(2)),
		discounts: Number(discounts.toFixed(2)),
		amount: Number(amount.toFixed(2)),
	};
}
