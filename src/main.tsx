import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AppLayout } from "@/layout/app-layout.tsx";
import { DashboardPage } from "@/pages/dashboard.tsx";
import { EnergyTransitionPage } from "@/pages/energy-transition.tsx";
import { InvoicePage } from "@/pages/invoice.tsx";
import { InvoiceDetailPage } from "@/pages/invoice-detail.tsx";
import { SupportPage } from "@/pages/support.tsx";
import { Providers } from "@/providers";

const router = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		children: [
			{
				index: true,
				element: <Navigate to="dashboard" replace />,
			},
			{
				path: "dashboard",
				Component: DashboardPage,
			},
			{
				path: "invoice",
				Component: InvoicePage,
			},
			{
				path: "invoice-detail",
				Component: InvoiceDetailPage,
			},
			{
				path: "support",
				Component: SupportPage,
			},
			{
				path: "energy-transition",
				Component: EnergyTransitionPage,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
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
