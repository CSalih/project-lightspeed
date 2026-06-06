import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionCards } from "./section-cards";

describe("SectionCards", () => {
	it("renders all four energy metrics cards", () => {
		render(<SectionCards />);

		expect(screen.getByText("Current Month Consumption")).toBeInTheDocument();
		expect(screen.getByText("Est. Next Bill")).toBeInTheDocument();
		expect(screen.getByText("Solar Production (Today)")).toBeInTheDocument();
		expect(screen.getByText("Grid Impact")).toBeInTheDocument();
	});

	it("displays correct mocked values", () => {
		render(<SectionCards />);

		expect(screen.getByText("342 kWh")).toBeInTheDocument();
		expect(screen.getByText("$82.15")).toBeInTheDocument();
		expect(screen.getByText("12.4 kWh")).toBeInTheDocument();
		expect(screen.getByText("85%")).toBeInTheDocument();
	});
});
