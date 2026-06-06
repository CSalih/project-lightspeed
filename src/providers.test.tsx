import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Providers } from "./providers";

describe("Providers", () => {
	it("renders children with providers", () => {
		render(
			<Providers>
				<div>Child Content</div>
			</Providers>,
		);

		expect(screen.getByText("Child Content")).toBeInTheDocument();
	});
});
