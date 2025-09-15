<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const paginationVariants = tv({
		base: "mx-auto flex w-full justify-center",
		variants: {
			variant: {
				default: "",
				outline: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type PaginationVariant = VariantProps<typeof paginationVariants>["variant"];

	export interface PaginationProps extends WithElementRef<HTMLAttributes<HTMLElement>> {
		variant?: PaginationVariant;
		page?: number;
		perPage?: number;
		total?: number;
		siblingCount?: number;
		showEdges?: boolean;
		onPageChange?: (page: number) => void;
	}

	interface PaginationRange {
		type: "page" | "ellipsis";
		page?: number;
	}

	function calculatePaginationRange(
		currentPage: number,
		totalPages: number,
		siblingCount: number = 1,
		showEdges: boolean = true
	): PaginationRange[] {
		const range: PaginationRange[] = [];

		// Always show first page if showEdges is true
		if (showEdges && totalPages > 1) {
			range.push({ type: "page", page: 1 });
		}

		// Calculate start and end of sibling range around current page
		const siblingStart = Math.max(showEdges ? 2 : 1, currentPage - siblingCount);
		const siblingEnd = Math.min(showEdges ? totalPages - 1 : totalPages, currentPage + siblingCount);

		// Add ellipsis before siblings if needed
		if (showEdges && siblingStart > 2) {
			range.push({ type: "ellipsis" });
		}

		// Add sibling pages
		for (let page = siblingStart; page <= siblingEnd; page++) {
			// Avoid duplicating first page if showEdges is true
			if (!showEdges || page !== 1) {
				range.push({ type: "page", page });
			}
		}

		// Add ellipsis after siblings if needed
		if (showEdges && siblingEnd < totalPages - 1) {
			range.push({ type: "ellipsis" });
		}

		// Always show last page if showEdges is true and there's more than one page
		if (showEdges && totalPages > 1 && siblingEnd < totalPages) {
			range.push({ type: "page", page: totalPages });
		}

		return range;
	}
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		page = 1,
		perPage = 10,
		total = 0,
		siblingCount = 1,
		showEdges = true,
		onPageChange,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationProps = $props();

	const totalPages = $derived(Math.ceil(total / perPage));
	const hasPreviousPage = $derived(page > 1);
	const hasNextPage = $derived(page < totalPages);

	const range = $derived(calculatePaginationRange(page, totalPages, siblingCount, showEdges));

	function goToPage(newPage: number) {
		if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
			onPageChange?.(newPage);
		}
	}

	function goToPrevious() {
		if (hasPreviousPage) {
			goToPage(page - 1);
		}
	}

	function goToNext() {
		if (hasNextPage) {
			goToPage(page + 1);
		}
	}
</script>

<nav
	bind:this={ref}
	data-slot="pagination"
	class={cn(paginationVariants({ variant }), className)}
	role="navigation"
	aria-label="Pagination Navigation"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ul class="flex flex-row items-center gap-1">
			<!-- Previous button -->
			<li>
				<button
					type="button"
					class="btn btn-sm btn-ghost"
					class:btn-disabled={!hasPreviousPage}
					disabled={!hasPreviousPage}
					onclick={goToPrevious}
					aria-label="Go to previous page"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
					Previous
				</button>
			</li>

			<!-- Page numbers -->
			{#each range as item}
				{#if item.type === "page" && item.page}
					<li>
						<button
							type="button"
							class="btn btn-sm"
							class:btn-active={item.page === page}
							class:btn-ghost={item.page !== page}
							onclick={() => goToPage(item.page!)}
							aria-label="Go to page {item.page}"
							aria-current={item.page === page ? "page" : undefined}
						>
							{item.page}
						</button>
					</li>
				{:else if item.type === "ellipsis"}
					<li>
						<span class="px-3 py-2 text-sm text-base-content/50">…</span>
					</li>
				{/if}
			{/each}

			<!-- Next button -->
			<li>
				<button
					type="button"
					class="btn btn-sm btn-ghost"
					class:btn-disabled={!hasNextPage}
					disabled={!hasNextPage}
					onclick={goToNext}
					aria-label="Go to next page"
				>
					Next
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</li>
		</ul>
	{/if}
</nav>