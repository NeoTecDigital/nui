<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const chartLegendVariants = tv({
		base: "flex flex-wrap items-center justify-center gap-4 text-sm",
		variants: {
			align: {
				start: "justify-start",
				center: "justify-center", 
				end: "justify-end",
			},
			verticalAlign: {
				top: "items-start",
				middle: "items-center",
				bottom: "items-end",
			},
		},
		defaultVariants: {
			align: "center",
			verticalAlign: "middle",
		},
	});

	export type ChartLegendProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		payload?: Array<{
			value: string;
			type?: string;
			id?: string;
			color?: string;
			dataKey?: string;
		}>;
		align?: "start" | "center" | "end";
		verticalAlign?: "top" | "middle" | "bottom";
		hideIcon?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { ChartConfig } from "./chart.svelte";

	let {
		class: className,
		payload = [],
		align = "center",
		verticalAlign = "middle",
		hideIcon = false,
		ref = $bindable(null),
		children,
		...restProps
	}: ChartLegendProps = $props();

	const config = getContext<ChartConfig>("chart-config") ?? {};

	// Format legend items
	const formattedPayload = $derived(() => {
		return payload.map((item) => ({
			...item,
			displayName: config[item.dataKey || item.value]?.label ?? item.value,
			color: item.color ?? config[item.dataKey || item.value]?.color ?? "#8884d8",
		}));
	});
</script>

<div
	bind:this={ref}
	class={cn(chartLegendVariants({ align, verticalAlign }), className)}
	data-chart-legend=""
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if formattedPayload.length > 0}
		{#each formattedPayload as item}
			<div class="flex items-center gap-2">
				{#if !hideIcon}
					<div
						class="w-3 h-3 rounded-sm flex-shrink-0"
						style:background-color={item.color}
					></div>
				{/if}
				<span class="text-sm text-base-content/80">
					{item.displayName}
				</span>
			</div>
		{/each}
	{/if}
</div>