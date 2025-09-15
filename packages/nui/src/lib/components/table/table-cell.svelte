<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const tableCellVariants = tv({
		base: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		variants: {
			header: {
				true: "h-10 px-2 text-left align-middle font-medium text-base-content/70 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				false: "",
			},
		},
		defaultVariants: {
			header: false,
		},
	});

	export type TableCellProps = WithElementRef<HTMLAttributes<HTMLTableCellElement>> & {
		header?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		header = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TableCellProps = $props();
</script>

{#if header}
	<th
		bind:this={ref}
		data-slot="table-cell"
		class={cn(tableCellVariants({ header }), className)}
		{...restProps}
	>
		{@render children?.()}
	</th>
{:else}
	<td
		bind:this={ref}
		data-slot="table-cell"
		class={cn(tableCellVariants({ header }), className)}
		{...restProps}
	>
		{@render children?.()}
	</td>
{/if}