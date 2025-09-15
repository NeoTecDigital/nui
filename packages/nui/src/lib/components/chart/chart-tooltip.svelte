<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const chartTooltipVariants = tv({
		base: "z-50 overflow-hidden rounded-md border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content shadow-md",
	});

	export type ChartTooltipProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		active?: boolean;
		label?: string;
		payload?: Array<{
			name: string;
			value: number | string;
			color: string;
			dataKey: string;
		}>;
		hideLabel?: boolean;
		hideIndicator?: boolean;
		indicator?: "line" | "dot" | "dashed";
		nameKey?: string;
		labelKey?: string;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { ChartConfig } from "./chart.svelte";

	let {
		class: className,
		active = false,
		label,
		payload = [],
		hideLabel = false,
		hideIndicator = false,
		indicator = "dot",
		nameKey = "name",
		labelKey = "value",
		ref = $bindable(null),
		children,
		...restProps
	}: ChartTooltipProps = $props();

	const config = getContext<ChartConfig>("chart-config") ?? {};

	// Format tooltip content
	const formattedPayload = $derived(() => {
		return payload.map((item) => ({
			...item,
			displayName: config[item.dataKey]?.label ?? item.name,
			color: item.color ?? config[item.dataKey]?.color ?? "#8884d8",
		}));
	});
</script>

{#if active && (payload.length > 0 || children)}
	<div
		bind:this={ref}
		class={cn(chartTooltipVariants(), className)}
		data-chart-tooltip=""
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else}
			{#if !hideLabel && label}
				<div class="font-medium text-base-content/80 mb-1">
					{label}
				</div>
			{/if}
			
			{#if formattedPayload.length > 0}
				<div class="space-y-1">
					{#each formattedPayload as item}
						<div class="flex items-center gap-2">
							{#if !hideIndicator}
								<div
									class="w-2 h-2 rounded-full flex-shrink-0"
									class:border-2={indicator === "line"}
									class:border-dashed={indicator === "dashed"}
									style:background-color={indicator === "dot" ? item.color : "transparent"}
									style:border-color={indicator !== "dot" ? item.color : "transparent"}
								></div>
							{/if}
							<span class="font-medium text-sm">
								{item.displayName}:
							</span>
							<span class="text-sm text-base-content/70">
								{typeof item.value === "number" ? item.value.toLocaleString() : item.value}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
{/if}