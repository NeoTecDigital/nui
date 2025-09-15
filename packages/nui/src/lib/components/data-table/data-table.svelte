<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const dataTableVariants = tv({
		base: "w-full caption-bottom text-sm",
		variants: {
			variant: {
				default: "",
				striped: "table-zebra",
				bordered: "border border-base-300",
			},
			size: {
				default: "",
				sm: "table-sm",
				lg: "table-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type DataTableVariant = VariantProps<typeof dataTableVariants>["variant"];
	export type DataTableSize = VariantProps<typeof dataTableVariants>["size"];

	export interface DataTableColumn<T = any> {
		id: string;
		accessorKey?: keyof T;
		accessor?: (row: T) => any;
		header: string | ((column: DataTableColumn<T>) => any);
		cell?: (value: any, row: T) => any;
		sortable?: boolean;
		filterable?: boolean;
		className?: string;
		headerClassName?: string;
		cellClassName?: string;
		width?: string | number;
		minWidth?: string | number;
		maxWidth?: string | number;
	}

	export interface DataTableProps<T = any> extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		variant?: DataTableVariant;
		size?: DataTableSize;
		data?: T[];
		columns?: DataTableColumn<T>[];
		loading?: boolean;
		enableSorting?: boolean;
		enableFiltering?: boolean;
		enableSelection?: boolean;
		enablePagination?: boolean;
		pageSize?: number;
		manualPagination?: boolean;
		manualSorting?: boolean;
		manualFiltering?: boolean;
		onSortingChange?: (sorting: SortingState) => void;
		onColumnFiltersChange?: (filters: ColumnFilter[]) => void;
		onRowSelectionChange?: (selection: Record<string, boolean>) => void;
		onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
		emptyMessage?: string;
		rowSelection?: Record<string, boolean>;
		sorting?: SortingState;
		columnFilters?: ColumnFilter[];
		pagination?: { pageIndex: number; pageSize: number };
		rowCount?: number;
	}

	export interface SortingState {
		id: string;
		desc: boolean;
	}

	export interface ColumnFilter {
		id: string;
		value: unknown;
	}

	interface TableState<T> {
		data: T[];
		filteredData: T[];
		sortedData: T[];
		paginatedData: T[];
		rowSelection: Record<string, boolean>;
		sorting: SortingState | null;
		columnFilters: ColumnFilter[];
		pagination: { pageIndex: number; pageSize: number };
		globalFilter: string;
	}

	function getCellValue<T>(row: T, column: DataTableColumn<T>): any {
		if (column.accessor) {
			return column.accessor(row);
		}
		if (column.accessorKey) {
			return (row as any)[column.accessorKey];
		}
		return "";
	}

	function sortData<T>(data: T[], sorting: SortingState | null, columns: DataTableColumn<T>[]): T[] {
		if (!sorting) return data;

		const column = columns.find(col => col.id === sorting.id);
		if (!column) return data;

		return [...data].sort((a, b) => {
			const aValue = getCellValue(a, column);
			const bValue = getCellValue(b, column);

			let comparison = 0;
			if (aValue < bValue) comparison = -1;
			if (aValue > bValue) comparison = 1;

			return sorting.desc ? -comparison : comparison;
		});
	}

	function filterData<T>(data: T[], filters: ColumnFilter[], columns: DataTableColumn<T>[], globalFilter: string): T[] {
		let filtered = data;

		// Apply column filters
		for (const filter of filters) {
			const column = columns.find(col => col.id === filter.id);
			if (!column || !filter.value) continue;

			filtered = filtered.filter(row => {
				const value = getCellValue(row, column);
				const filterValue = String(filter.value).toLowerCase();
				return String(value).toLowerCase().includes(filterValue);
			});
		}

		// Apply global filter
		if (globalFilter) {
			const searchTerm = globalFilter.toLowerCase();
			filtered = filtered.filter(row => {
				return columns.some(column => {
					const value = getCellValue(row, column);
					return String(value).toLowerCase().includes(searchTerm);
				});
			});
		}

		return filtered;
	}

	function paginateData<T>(data: T[], pagination: { pageIndex: number; pageSize: number }): T[] {
		const start = pagination.pageIndex * pagination.pageSize;
		const end = start + pagination.pageSize;
		return data.slice(start, end);
	}
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		data = [],
		columns = [],
		loading = false,
		enableSorting = true,
		enableFiltering = true,
		enableSelection = false,
		enablePagination = true,
		pageSize = 10,
		manualPagination = false,
		manualSorting = false,
		manualFiltering = false,
		onSortingChange,
		onColumnFiltersChange,
		onRowSelectionChange,
		onPaginationChange,
		emptyMessage = "No data available",
		rowSelection = {},
		sorting = null,
		columnFilters = [],
		pagination = { pageIndex: 0, pageSize },
		rowCount,
		ref = $bindable(null),
		children,
		...restProps
	}: DataTableProps = $props();

	let globalFilter = $state("");

	const state = $state<TableState<any>>({
		data,
		filteredData: data,
		sortedData: data,
		paginatedData: data,
		rowSelection,
		sorting,
		columnFilters,
		pagination,
		globalFilter: "",
	});

	// Update state when props change
	$effect(() => {
		state.data = data;
		state.rowSelection = rowSelection;
		state.sorting = sorting;
		state.columnFilters = columnFilters;
		state.pagination = pagination;
	});

	// Process data
	$effect(() => {
		if (manualFiltering) {
			state.filteredData = state.data;
		} else {
			state.filteredData = filterData(state.data, state.columnFilters, columns, globalFilter);
		}

		if (manualSorting) {
			state.sortedData = state.filteredData;
		} else {
			state.sortedData = sortData(state.filteredData, state.sorting, columns);
		}

		if (manualPagination) {
			state.paginatedData = state.sortedData;
		} else {
			state.paginatedData = paginateData(state.sortedData, state.pagination);
		}
	});

	const totalRows = $derived(rowCount ?? state.filteredData.length);
	const totalPages = $derived(Math.ceil(totalRows / state.pagination.pageSize));
	const hasSelection = $derived(enableSelection && Object.keys(state.rowSelection).length > 0);
	const allSelected = $derived(
		state.paginatedData.length > 0 && 
		state.paginatedData.every((_, index) => {
			const rowIndex = state.pagination.pageIndex * state.pagination.pageSize + index;
			return state.rowSelection[rowIndex];
		})
	);
	const someSelected = $derived(
		state.paginatedData.some((_, index) => {
			const rowIndex = state.pagination.pageIndex * state.pagination.pageSize + index;
			return state.rowSelection[rowIndex];
		})
	);

	function handleSort(columnId: string) {
		if (!enableSorting) return;

		const newSorting: SortingState = {
			id: columnId,
			desc: state.sorting?.id === columnId ? !state.sorting.desc : false,
		};

		state.sorting = newSorting;
		onSortingChange?.(newSorting);
	}

	function handleColumnFilter(columnId: string, value: string) {
		if (!enableFiltering) return;

		const newFilters = state.columnFilters.filter(f => f.id !== columnId);
		if (value) {
			newFilters.push({ id: columnId, value });
		}

		state.columnFilters = newFilters;
		onColumnFiltersChange?.(newFilters);
	}

	function handleRowSelection(index: number, selected: boolean) {
		if (!enableSelection) return;

		const newSelection = { ...state.rowSelection };
		const actualIndex = state.pagination.pageIndex * state.pagination.pageSize + index;

		if (selected) {
			newSelection[actualIndex] = true;
		} else {
			delete newSelection[actualIndex];
		}

		state.rowSelection = newSelection;
		onRowSelectionChange?.(newSelection);
	}

	function handleSelectAll(selected: boolean) {
		if (!enableSelection) return;

		const newSelection = { ...state.rowSelection };

		state.paginatedData.forEach((_, index) => {
			const actualIndex = state.pagination.pageIndex * state.pagination.pageSize + index;
			if (selected) {
				newSelection[actualIndex] = true;
			} else {
				delete newSelection[actualIndex];
			}
		});

		state.rowSelection = newSelection;
		onRowSelectionChange?.(newSelection);
	}

	function handlePageChange(newPageIndex: number) {
		const newPagination = { ...state.pagination, pageIndex: newPageIndex };
		state.pagination = newPagination;
		onPaginationChange?.(newPagination);
	}

	const tableId = generateId("data-table");
</script>

<div
	bind:this={ref}
	data-slot="data-table"
	class={cn("space-y-4", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- Toolbar -->
		{#if enableFiltering}
			<div class="flex items-center justify-between">
				<div class="flex flex-1 items-center space-x-2">
					<input
						type="text"
						placeholder="Search all columns..."
						class="input input-bordered input-sm max-w-sm"
						bind:value={globalFilter}
					/>
				</div>
				{#if hasSelection}
					<div class="text-sm text-base-content/70">
						{Object.keys(state.rowSelection).length} of {totalRows} row(s) selected
					</div>
				{/if}
			</div>
		{/if}

		<!-- Table -->
		<div class="overflow-x-auto border border-base-300 rounded-lg">
			<table
				class={cn("table", dataTableVariants({ variant, size }))}
				id={tableId}
				role="table"
				aria-label="Data table"
			>
				<thead>
					<tr>
						{#if enableSelection}
							<th class="w-12">
								<label class="label cursor-pointer">
									<input
										type="checkbox"
										class="checkbox checkbox-sm"
										checked={allSelected}
										indeterminate={someSelected && !allSelected}
										onchange={(e) => handleSelectAll(e.currentTarget.checked)}
									/>
								</label>
							</th>
						{/if}
						{#each columns as column}
							<th class={cn("text-left font-medium", column.headerClassName)}>
								<div class="flex items-center space-x-2">
									{#if typeof column.header === "string"}
										{#if column.sortable !== false && enableSorting}
											<button
												type="button"
												class="flex items-center space-x-1 hover:text-primary"
												onclick={() => handleSort(column.id)}
											>
												<span>{column.header}</span>
												<div class="flex flex-col">
													<svg
														class="w-3 h-3"
														class:text-primary={state.sorting?.id === column.id && !state.sorting?.desc}
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
													</svg>
												</div>
											</button>
										{:else}
											<span>{column.header}</span>
										{/if}
									{:else}
										{@render column.header(column)}
									{/if}
								</div>
								{#if column.filterable !== false && enableFiltering}
									<div class="mt-1">
										<input
											type="text"
											placeholder="Filter..."
											class="input input-xs input-bordered w-full"
											oninput={(e) => handleColumnFilter(column.id, e.currentTarget.value)}
										/>
									</div>
								{/if}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#if loading}
						<tr>
							<td colspan={columns.length + (enableSelection ? 1 : 0)} class="text-center py-8">
								<div class="loading loading-spinner loading-md"></div>
								<div class="mt-2 text-sm text-base-content/70">Loading...</div>
							</td>
						</tr>
					{:else if state.paginatedData.length === 0}
						<tr>
							<td colspan={columns.length + (enableSelection ? 1 : 0)} class="text-center py-8 text-base-content/70">
								{emptyMessage}
							</td>
						</tr>
					{:else}
						{#each state.paginatedData as row, index}
							<tr class="hover:bg-base-200/50">
								{#if enableSelection}
									<td>
										<label class="label cursor-pointer">
											<input
												type="checkbox"
												class="checkbox checkbox-sm"
												checked={state.rowSelection[state.pagination.pageIndex * state.pagination.pageSize + index] || false}
												onchange={(e) => handleRowSelection(index, e.currentTarget.checked)}
											/>
										</label>
									</td>
								{/if}
								{#each columns as column}
									<td class={cn("py-2", column.cellClassName)}>
										{#if column.cell}
											{@render column.cell(getCellValue(row, column), row)}
										{:else}
											{getCellValue(row, column)}
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if enablePagination && totalPages > 1}
			<div class="flex items-center justify-between">
				<div class="text-sm text-base-content/70">
					Showing {state.pagination.pageIndex * state.pagination.pageSize + 1} to {Math.min((state.pagination.pageIndex + 1) * state.pagination.pageSize, totalRows)} of {totalRows} results
				</div>
				<div class="join">
					<button
						type="button"
						class="join-item btn btn-sm"
						class:btn-disabled={state.pagination.pageIndex === 0}
						disabled={state.pagination.pageIndex === 0}
						onclick={() => handlePageChange(state.pagination.pageIndex - 1)}
					>
						Previous
					</button>
					{#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
						const startPage = Math.max(0, Math.min(totalPages - 5, state.pagination.pageIndex - 2));
						return startPage + i;
					}) as pageNum}
						<button
							type="button"
							class="join-item btn btn-sm"
							class:btn-active={pageNum === state.pagination.pageIndex}
							onclick={() => handlePageChange(pageNum)}
						>
							{pageNum + 1}
						</button>
					{/each}
					<button
						type="button"
						class="join-item btn btn-sm"
						class:btn-disabled={state.pagination.pageIndex >= totalPages - 1}
						disabled={state.pagination.pageIndex >= totalPages - 1}
						onclick={() => handlePageChange(state.pagination.pageIndex + 1)}
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>