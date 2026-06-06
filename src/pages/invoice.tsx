import {
	CreditCardIcon,
	DownloadIcon,
	HistoryIcon,
	WalletIcon,
} from "lucide-react";
import invoicesData from "@/assets/data/invoices.json" with { type: "json" };
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InvoicePage() {
	const totalPaid = invoicesData
		.filter((i) => i.status === "Paid")
		.reduce((acc, curr) => acc + curr.amount, 0);
	const pendingAmount = invoicesData
		.filter((i) => i.status === "Pending")
		.reduce((acc, curr) => acc + curr.amount, 0);

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Billing Overview</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<DownloadIcon className="mr-2 size-4" />
						Export All
					</Button>
					<Button size="sm">
						<CreditCardIcon className="mr-2 size-4" />
						Manage Payment
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Amount Due</CardTitle>
						<WalletIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold tabular-nums">
							${pendingAmount.toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							Next payment due June 15, 2024
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Last Payment</CardTitle>
						<HistoryIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold tabular-nums">$125.50</div>
						<p className="text-xs text-muted-foreground">
							Successful on May 05, 2024
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Year to Date</CardTitle>
						<CreditCardIcon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold tabular-nums">
							${totalPaid.toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							Total energy spending in 2024
						</p>
					</CardContent>
				</Card>
			</div>

			<Card className="flex-1 overflow-hidden">
				<div className="py-6">
					<DataTable data={invoicesData} />
				</div>
			</Card>
		</div>
	);
}
