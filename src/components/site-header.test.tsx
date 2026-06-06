import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../test/test-utils";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
	it("renders breadcrumbs and separator", () => {
		renderWithRouter(<SiteHeader />);

		expect(screen.getByText("Documents")).toBeInTheDocument();
	});
});
