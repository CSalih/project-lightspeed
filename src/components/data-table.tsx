import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	CircleCheckIcon,
	EllipsisVerticalIcon,
	LoaderIcon,
} from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const schema = z.object({
	id: z.string(),
	date: z.string(),
	amount: z.number(),
	status: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
	{
		accessorKey: "id",
		header: "Invoice ID",
		cell: ({ row }) => (
			<Button
				variant="link"
				className="px-0"
				onClick={() =>
					(window.location.href = `/invoice-detail?id=${row.original.id}`)
				}
			>
				{row.original.id}
			</Button>
		),
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => (
			<div className="tabular-nums">
				{new Date(row.original.date).toLocaleDateString()}
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge variant="outline" className="px-1.5 text-muted-foreground">
				{row.original.status === "Paid" ? (
					<CircleCheckIcon className="size-3 fill-green-500 dark:fill-green-400" />
				) : (
					<LoaderIcon className="size-3 animate-spin" />
				)}
				{row.original.status}
			</Badge>
		),
	},
	{
		accessorKey: "amount",
		header: () => <div className="w-full text-right">Amount</div>,
		cell: ({ row }) => (
			<div className="w-full text-right font-medium tabular-nums">
				${row.original.amount.toFixed(2)}
			</div>
		),
	},
	{
		id: "actions",
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
						size="icon"
					>
						<EllipsisVerticalIcon />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					<DropdownMenuItem>View Details</DropdownMenuItem>
					<DropdownMenuItem>Download PDF</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Report Issue</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];

export function DataTable({
	data: initialData,
}: {
	data: z.infer<typeof schema>[];
}) {
	const [data] = React.useState(() => initialData);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="flex flex-col gap-4 px-4 lg:px-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Billing History</h2>
				<Button variant="outline" size="sm">
					Download All
				</Button>
			</div>
			<div className="overflow-hidden rounded-lg border">
				<Table>
					<TableHeader className="bg-muted">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
