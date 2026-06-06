import {
	ArrowRightIcon,
	BatteryIcon,
	CarIcon,
	LandmarkIcon,
	LeafIcon,
	LightbulbIcon,
	SparklesIcon,
	SunIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function EnergyTransitionPage() {
	const recommendations = [
		{
			title: "Upgrade to Smart Thermostat",
			description:
				"Based on your consumption peaks, a smart thermostat could save you up to 12% on heating costs.",
			impact: "High Impact",
			category: "Efficiency",
		},
		{
			title: "Solar Battery Storage",
			description:
				"You're exporting 40% of your solar production. A home battery would let you use that energy at night.",
			impact: "Medium Impact",
			category: "Storage",
		},
	];

	const topics = [
		{
			id: "solar",
			title: "Solar Panels",
			icon: <SunIcon className="size-5 text-yellow-500" />,
			content:
				"Generate your own clean energy and reduce your reliance on the grid. Modern PV systems are more efficient than ever.",
			links: ["How solar works", "Installation guide", "ROI Calculator"],
		},
		{
			id: "ev",
			title: "Electric Vehicles",
			icon: <CarIcon className="size-5 text-blue-500" />,
			content:
				"Switch to electric and save on fuel and maintenance. We offer special overnight charging tariffs for EV owners.",
			links: ["EV Tariff plans", "Home charging setup", "Available rebates"],
		},
		{
			id: "battery",
			title: "Home Batteries",
			icon: <BatteryIcon className="size-5 text-green-500" />,
			content:
				"Store excess solar energy or buy energy when it's cheap to use during peak hours. Enhance your energy independence.",
			links: ["Battery basics", "Product comparison", "Backup power info"],
		},
		{
			id: "efficiency",
			title: "Energy Efficiency",
			icon: <LightbulbIcon className="size-5 text-orange-500" />,
			content:
				"The cheapest energy is the energy you don't use. Learn how small changes can lead to big savings.",
			links: ["Home audit checklist", "Appliance ratings", "Quick tips"],
		},
		{
			id: "programs",
			title: "Renewable Programs",
			icon: <LeafIcon className="size-5 text-emerald-500" />,
			content:
				"Not ready for your own panels? Join a community solar project or switch to a 100% renewable energy plan.",
			links: ["Community Solar", "Green Tariffs", "Carbon offsets"],
		},
		{
			id: "subsidies",
			title: "Incentives & Subsidies",
			icon: <LandmarkIcon className="size-5 text-purple-500" />,
			content:
				"Take advantage of government grants and tax credits for energy-efficient home improvements.",
			links: ["Federal tax credits", "State rebates", "Grant application"],
		},
	];

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Energy Transition Hub
				</h1>
				<p className="text-muted-foreground max-w-[800px]">
					Your guide to a cleaner, more efficient energy future. Explore
					technologies, find financial incentives, and get personalized advice.
				</p>
			</div>

			<Card className="bg-primary/5 border-primary/20">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<SparklesIcon className="size-5 text-primary" />
						Personalized Recommendations
					</CardTitle>
					<CardDescription>
						Based on your current energy profile and usage patterns
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					{recommendations.map((rec) => (
						<div
							key={rec.title}
							className="flex flex-col justify-between p-4 rounded-xl bg-background border shadow-sm"
						>
							<div>
								<div className="flex justify-between items-start mb-2">
									<Badge variant="secondary">{rec.category}</Badge>
									<span className="text-xs font-semibold text-primary">
										{rec.impact}
									</span>
								</div>
								<h3 className="font-bold mb-1">{rec.title}</h3>
								<p className="text-sm text-muted-foreground">
									{rec.description}
								</p>
							</div>
							<Button variant="link" className="px-0 w-fit mt-4 h-auto">
								Learn more <ArrowRightIcon className="ml-2 size-3" />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{topics.map((topic) => (
					<Card key={topic.id} className="flex flex-col">
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								{topic.icon}
								<CardTitle className="text-lg">{topic.title}</CardTitle>
							</div>
							<CardDescription className="line-clamp-3">
								{topic.content}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1">
							<ul className="space-y-1">
								{topic.links.map((link) => (
									<li key={link}>
										<Button variant="link" className="h-auto p-0 text-sm h-7">
											{link}
										</Button>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter className="pt-0">
							<Button variant="outline" className="w-full">
								Explore {topic.title}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<Card className="bg-muted/50 border-dashed">
				<CardHeader>
					<CardTitle className="text-center">Still have questions?</CardTitle>
					<CardDescription className="text-center">
						Our energy transition experts can help you build a custom roadmap
						for your home.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center pb-6">
					<Button onClick={() => (window.location.href = "/support")}>
						Schedule a Free Consultation
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
