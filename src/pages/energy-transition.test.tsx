import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EnergyTransitionPage } from "./energy-transition";

describe("EnergyTransitionPage", () => {
	it("renders transition hub and recommendations", () => {
		render(<EnergyTransitionPage />);

		expect(screen.getByText("Energy Transition Hub")).toBeInTheDocument();
		expect(
			screen.getByText("Personalized Recommendations"),
		).toBeInTheDocument();
		expect(screen.getByText("Upgrade to Smart Thermostat")).toBeInTheDocument();
	});

	it("renders all technology cards", () => {
		render(<EnergyTransitionPage />);

		expect(screen.getByText("Solar Panels")).toBeInTheDocument();
		expect(screen.getByText("Electric Vehicles")).toBeInTheDocument();
		expect(screen.getByText("Home Batteries")).toBeInTheDocument();
		expect(screen.getByText("Energy Efficiency")).toBeInTheDocument();
		expect(screen.getByText("Renewable Programs")).toBeInTheDocument();
		expect(screen.getByText("Incentives & Subsidies")).toBeInTheDocument();
	});
});
