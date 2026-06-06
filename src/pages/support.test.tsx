import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SupportPage } from "./support";

describe("SupportPage", () => {
	it("renders support page with tabs", () => {
		render(<SupportPage />);

		expect(screen.getByText("Customer Support")).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Tickets" })).toBeInTheDocument();
		expect(
			screen.getByRole("tab", { name: "Report Issue" }),
		).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "FAQ" })).toBeInTheDocument();
	});

	it("renders new ticket form by default", () => {
		render(<SupportPage />);

		expect(screen.getByText("Open a New Ticket")).toBeInTheDocument();
		expect(screen.getByLabelText("Subject")).toBeInTheDocument();
		expect(screen.getByLabelText("Message")).toBeInTheDocument();
	});
});
