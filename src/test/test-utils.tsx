import { render as rtlRender } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

function renderWithRouter(ui: ReactElement, { route = "/" } = {}) {
	return rtlRender(
		<MemoryRouter initialEntries={[route]}>
			<TooltipProvider>
				<SidebarProvider>{ui}</SidebarProvider>
			</TooltipProvider>
		</MemoryRouter>,
	);
}

export * from "@testing-library/react";
export { renderWithRouter };
