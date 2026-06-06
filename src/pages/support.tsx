import {
	AlertTriangleIcon,
	FileTextIcon,
	HelpCircleIcon,
	MessageSquareIcon,
	SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SupportPage() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
			<h1 className="text-2xl font-bold">Customer Support</h1>

			<Tabs defaultValue="tickets" className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-3">
					<TabsTrigger value="tickets">Tickets</TabsTrigger>
					<TabsTrigger value="report">Report Issue</TabsTrigger>
					<TabsTrigger value="faq">FAQ</TabsTrigger>
				</TabsList>

				<TabsContent value="tickets" className="mt-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Open a New Ticket</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										placeholder="What do you need help with?"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<textarea
										id="message"
										className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
										placeholder="Describe your issue in detail..."
									></textarea>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="ml-auto">
									<SendIcon className="mr-2 size-4" />
									Submit Ticket
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Recent Tickets</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-sm text-center py-8">
								<MessageSquareIcon className="mx-auto size-12 text-muted-foreground/50" />
								<p className="text-muted-foreground">
									You have no active support tickets.
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="report" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Report a Technical Issue</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-muted-foreground">
								Reporting an outage? Please use our proactive outage map or call
								our 24/7 hotline for immediate safety concerns.
							</p>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Button variant="outline" className="h-20 flex-col gap-2">
									<AlertTriangleIcon className="size-6" />
									Report Power Outage
								</Button>
								<Button variant="outline" className="h-20 flex-col gap-2">
									<HelpCircleIcon className="size-6" />
									Metering Issue
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="faq" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Frequently Asked Questions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{[
								"How do I read my digital bill?",
								"When is my next payment due?",
								"How can I switch to a greener tariff?",
								"What should I do during a planned outage?",
							].map((q) => (
								<div
									key={q}
									className="flex items-center justify-between rounded-lg border p-4"
								>
									<div className="flex items-center gap-3">
										<FileTextIcon className="size-5 text-primary" />
										<span className="font-medium">{q}</span>
									</div>
									<Button variant="ghost" size="sm">
										Read More
									</Button>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
