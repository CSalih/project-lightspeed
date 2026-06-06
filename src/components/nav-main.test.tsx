import { screen } from "@testing-library/react";
import { LayoutDashboardIcon } from "lucide-react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { NavMain } from "./nav-main";

const mockItems = [{ title: "Home", url: "/", icon: <LayoutDashboardIcon /> }];

describe("NavMain", () => {
	it("renders nav items", () => {
		renderWithRouter(<NavMain items={mockItems} />);

		expect(screen.getByText("Home")).toBeInTheDocument();
	});
});
