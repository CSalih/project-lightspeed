import { ArrowLeftIcon, DownloadIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import invoicesData from "@/assets/data/invoices.json" with { type: "json" };
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function InvoiceDetailPage() {
	const [searchParams] = useSearchParams();
	const invoiceId = searchParams.get("id") || "INV-001";
	const invoice =
		invoicesData.find((i) => i.id === invoiceId) || invoicesData[0];

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => window.history.back()}
				>
					<ArrowLeftIcon className="size-5" />
				</Button>
				<h1 className="text-2xl font-bold">Invoice Details</h1>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-xl">{invoice.id}</CardTitle>
							<p className="text-sm text-muted-foreground">
								Issued on {new Date(invoice.date).toLocaleDateString()}
							</p>
						</div>
						<Badge
							variant={invoice.status === "Paid" ? "outline" : "destructive"}
						>
							{invoice.status}
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<h3 className="mb-2 font-semibold">Usage Summary</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span>Consumption Charges</span>
									<span className="tabular-nums">
										${invoice.consumptionCharges.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Grid/Network Charges</span>
									<span className="tabular-nums">
										${invoice.gridCharges.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Taxes and Fees</span>
									<span className="tabular-nums">
										${invoice.taxes.toFixed(2)}
									</span>
								</div>
								{invoice.discounts > 0 && (
									<div className="flex justify-between text-green-600">
										<span>Discounts/Credits</span>
										<span className="tabular-nums">
											-${invoice.discounts.toFixed(2)}
										</span>
									</div>
								)}
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between pt-2">
							<span className="text-lg font-bold">Total Amount Due</span>
							<span className="text-2xl font-bold tabular-nums">
								${invoice.amount.toFixed(2)}
							</span>
						</div>

						<div className="rounded-lg bg-muted p-4">
							<p className="mb-1 text-sm font-medium">Billing Comparison</p>
							<p className="text-sm text-muted-foreground">
								This bill is{" "}
								{invoice.amount > invoice.previousAmount ? "higher" : "lower"}{" "}
								than your last bill (${invoice.previousAmount.toFixed(2)}).
							</p>
						</div>
					</CardContent>
					<CardFooter className="justify-end gap-2">
						<Button variant="outline">
							<DownloadIcon className="mr-2 size-4" />
							Download PDF
						</Button>
						{invoice.status !== "Paid" && <Button>Pay Now</Button>}
					</CardFooter>
				</Card>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Need Help?</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p className="text-sm text-muted-foreground">
								Understanding your bill is important. If you have any questions
								about these charges, our team is here to help.
							</p>
							<Button variant="link" className="px-0">
								Explanation of charges
							</Button>
						</CardContent>
						<CardFooter>
							<Button
								className="w-full"
								variant="outline"
								onClick={() => (window.location.href = "/support")}
							>
								Contact Support
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
