import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { DataTable } from "./data-table";

const mockData = [
	{ id: "INV-001", date: "2024-05-01", amount: 125.5, status: "Paid" },
	{ id: "INV-002", date: "2024-04-01", amount: 118.0, status: "Paid" },
];

describe("DataTable", () => {
	it("renders table headers", () => {
		renderWithRouter(<DataTable data={mockData} />);

		expect(screen.getByText("Invoice ID")).toBeInTheDocument();
		expect(screen.getByText("Date")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();
		expect(screen.getByText("Amount")).toBeInTheDocument();
	});

	it("renders data rows", () => {
		renderWithRouter(<DataTable data={mockData} />);

		expect(screen.getByText("INV-001")).toBeInTheDocument();
		expect(screen.getByText("INV-002")).toBeInTheDocument();
		expect(screen.getByText("$125.50")).toBeInTheDocument();
	});
});
