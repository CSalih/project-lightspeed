import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { AppSidebar } from "./app-sidebar";

describe("AppSidebar", () => {
	it("renders navigation links", () => {
		renderWithRouter(<AppSidebar />);

		expect(screen.getByText("Project Lightspeed")).toBeInTheDocument();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Billing")).toBeInTheDocument();
		expect(screen.getByText("Support")).toBeInTheDocument();
		expect(screen.getByText("Energy Transition")).toBeInTheDocument();
	});

	it("renders user info", () => {
		renderWithRouter(<AppSidebar />);

		expect(screen.getByText("Group 1")).toBeInTheDocument();
		expect(screen.getByText("group1@student.uibk.ac.at")).toBeInTheDocument();
	});
});
