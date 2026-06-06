import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { InvoiceDetailPage } from "./invoice-detail";

describe("InvoiceDetailPage", () => {
	it("renders specific invoice details", () => {
		renderWithRouter(<InvoiceDetailPage />, {
			route: "/invoice-detail?id=INV-001",
		});

		expect(screen.getByText("Invoice Details")).toBeInTheDocument();
		expect(screen.getByText("INV-001")).toBeInTheDocument();
		expect(screen.getByText("Consumption Charges")).toBeInTheDocument();
		expect(screen.getByText("Total Amount Due")).toBeInTheDocument();
	});

	it("shows paid status for INV-001", () => {
		renderWithRouter(<InvoiceDetailPage />, {
			route: "/invoice-detail?id=INV-001",
		});

		expect(screen.getByText("Paid")).toBeInTheDocument();
	});
});
