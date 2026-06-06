import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AppLayout } from "@/layout/app-layout.tsx";
import { DashboardPage } from "@/pages/dashboard.tsx";
import { InvoicePage } from "@/pages/invoice.tsx";
import { Providers } from "@/providers";

const router = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		children: [
			{
				path: "dashboard",
				Component: DashboardPage,
			},
			{
				path: "invoice",
				Component: InvoicePage,
			},
		],
	},
]);

// biome-ignore lint/style/noNonNullAssertion: Element is guaranteed to exist by React
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<RouterProvider router={router} />,
		</Providers>
	</StrictMode>,
);
