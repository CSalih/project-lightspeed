import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { InvoicePage } from "./invoice";

describe("InvoicePage", () => {
	it("renders billing overview with summary cards", () => {
		renderWithRouter(<InvoicePage />);

		expect(screen.getByText("Billing Overview")).toBeInTheDocument();
		expect(screen.getByText("Amount Due")).toBeInTheDocument();
		expect(screen.getByText("Last Payment")).toBeInTheDocument();
		expect(screen.getByText("Year to Date")).toBeInTheDocument();
	});

	it("renders history table", () => {
		renderWithRouter(<InvoicePage />);

		expect(screen.getByText("Billing History")).toBeInTheDocument();
		expect(screen.getByText("INV-001")).toBeInTheDocument();
		expect(screen.getByText("INV-004")).toBeInTheDocument();
	});
});
