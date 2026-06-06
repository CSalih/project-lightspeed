import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { DashboardPage } from "./dashboard";

// Mock Recharts to avoid issues with JSDOM
vi.mock("recharts", () => ({
	ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
	AreaChart: ({ children }: any) => <div>{children}</div>,
	Area: () => <div>Area</div>,
	XAxis: () => <div>XAxis</div>,
	YAxis: () => <div>YAxis</div>,
	CartesianGrid: () => <div>Grid</div>,
	Tooltip: () => <div>Tooltip</div>,
	Legend: () => <div>Legend</div>,
}));

describe("DashboardPage", () => {
	it("renders dashboard with cards and chart", () => {
		renderWithRouter(<DashboardPage />);

		expect(screen.getByText("Current Month Consumption")).toBeInTheDocument();
		expect(screen.getByText("Energy Usage Overview")).toBeInTheDocument();
		expect(screen.getByText("Your Tariff Plan")).toBeInTheDocument();
	});

	it("shows outage banner if active outage exists", () => {
		renderWithRouter(<DashboardPage />);

		expect(
			screen.getByText(/Active Outage in Downtown Sector A/),
		).toBeInTheDocument();
	});
});
