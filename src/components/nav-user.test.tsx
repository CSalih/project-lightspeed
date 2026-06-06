import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { NavUser } from "./nav-user";

const mockUser = {
	name: "Test User",
	email: "test@example.com",
	avatar: "/avatar.jpg",
};

describe("NavUser", () => {
	it("renders user details", () => {
		renderWithRouter(<NavUser user={mockUser} />);

		expect(screen.getByText("Test User")).toBeInTheDocument();
		expect(screen.getByText("test@example.com")).toBeInTheDocument();
	});
});
