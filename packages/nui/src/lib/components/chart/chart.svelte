<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const chartVariants = tv({
		base: "w-full h-80 bg-base-100 rounded-lg border border-base-300",
		variants: {
			size: {
				sm: "h-40",
				md: "h-60", 
				lg: "h-80",
				xl: "h-96",
			},
		},
		defaultVariants: {
			size: "lg",
		},
	});

	export type ChartVariant = VariantProps<typeof chartVariants>["size"];

	export interface ChartConfig {
		[key: string]: {
			label: string;
			color?: string;
			theme?: {
				light: string;
				dark: string;
			};
		};
	}

	export type ChartProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		config: ChartConfig;
		size?: ChartVariant;
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";

	let {
		class: className,
		config,
		size = "lg",
		ref = $bindable(null),
		children,
		...restProps
	}: ChartProps = $props();

	// Provide chart configuration to child components
	setContext("chart-config", config);
</script>

<div
	bind:this={ref}
	class={cn(chartVariants({ size }), className)}
	data-chart=""
	{...restProps}
>
	{@render children?.()}
</div>