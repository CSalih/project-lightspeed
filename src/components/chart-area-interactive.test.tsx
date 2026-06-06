import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChartAreaInteractive } from "./chart-area-interactive";

// Mock Recharts
vi.mock("recharts", () => ({
	ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
	AreaChart: ({ children }: any) => <div>{children}</div>,
	Area: () => <div>Area</div>,
	XAxis: () => <div>XAxis</div>,
	YAxis: () => <div>YAxis</div>,
	CartesianGrid: () => <div>Grid</div>,
	Tooltip: () => <div>Tooltip</div>,
	Legend: () => <div>Legend</div>,
	defs: () => <div />,
	linearGradient: () => <div />,
	stop: () => <div />,
}));

describe("ChartAreaInteractive", () => {
	it("renders the chart container and titles", () => {
		render(<ChartAreaInteractive />);

		expect(screen.getByText("Energy Usage Overview")).toBeInTheDocument();
		expect(
			screen.getByText(/Consumption vs Solar Production/),
		).toBeInTheDocument();
	});

	it("renders time range options", () => {
		render(<ChartAreaInteractive />);

		expect(screen.getAllByText("Last 3 months")[0]).toBeInTheDocument();
		expect(screen.getAllByText("Last 30 days")[0]).toBeInTheDocument();
		expect(screen.getAllByText("Last 7 days")[0]).toBeInTheDocument();
	});
});
