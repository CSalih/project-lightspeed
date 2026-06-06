import "./App.css";

import type { ReactNode } from "react";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

type ProvidersProps = Readonly<{
	children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
	return <TooltipProvider>{children}</TooltipProvider>;
}
