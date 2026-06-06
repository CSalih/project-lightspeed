import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import invoicesData from "@/assets/data/invoices.json" with { type: "json" };
import outagesData from "@/assets/data/outages.json" with { type: "json" };
import tariffData from "@/assets/data/tariff.json" with { type: "json" };
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
	const activeOutage = outagesData.find((o) => o.status === "Active");

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{activeOutage && (
						<div className="px-4 lg:px-6">
							<div className="flex items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive-foreground">
								<AlertTriangleIcon className="size-6 text-destructive" />
								<div>
									<p className="font-semibold">
										Active Outage in {activeOutage.area}
									</p>
									<p className="text-sm opacity-90">
										{activeOutage.message} Estimated restoration:{" "}
										{new Date(activeOutage.endTime).toLocaleTimeString()}
									</p>
								</div>
							</div>
						</div>
					)}

					<SectionCards />

					<div className="px-4 lg:px-6">
						<ChartAreaInteractive />
					</div>

					<div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3">
						<Card className="lg:col-span-2">
							<DataTable data={invoicesData} />
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<InfoIcon className="size-5" />
									Your Tariff Plan
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="text-sm text-muted-foreground">Current Plan</p>
									<p className="font-medium text-lg">{tariffData.planName}</p>
								</div>
								<div className="flex justify-between border-t pt-2">
									<p className="text-sm text-muted-foreground">Price per kWh</p>
									<p className="font-medium">${tariffData.pricePerKwh}</p>
								</div>
								<div className="flex justify-between border-t pt-2">
									<p className="text-sm text-muted-foreground">Renewal Date</p>
									<p className="font-medium">
										{new Date(tariffData.renewalDate).toLocaleDateString()}
									</p>
								</div>
								<div className="border-t pt-2">
									<p className="text-sm text-muted-foreground italic">
										{tariffData.terms}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
