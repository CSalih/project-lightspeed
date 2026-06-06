import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { AppLayout } from "./app-layout";

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe("AppLayout", () => {
	it("renders sidebar and outlet", () => {
		renderWithRouter(<AppLayout />);

		expect(screen.getByText("Project Lightspeed")).toBeInTheDocument();
		// Outlet will be empty as we're not providing children routes in the simple renderWithRouter
	});
});
