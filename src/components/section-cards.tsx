"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
	return (
		<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Current Month Consumption</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						342 kWh
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingDownIcon />
							-5.2%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Trending down this month <TrendingDownIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Compared to same period last month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Est. Next Bill</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						$82.15
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingUpIcon />
							+2.1%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Slightly higher than last month{" "}
						<TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Projected for June 1st</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Solar Production (Today)</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						12.4 kWh
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<TrendingUpIcon />
							+15%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						High production day <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Sunny weather helping output
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Grid Impact</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						85%
					</CardTitle>
					<CardAction>
						<Badge variant="outline">Renewable</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Green energy mix <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Tariff: Green Energy Plus</div>
				</CardFooter>
			</Card>
		</div>
	);
}
