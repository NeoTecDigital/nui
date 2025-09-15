<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type ChartContainerProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		minHeight?: number;
	};
</script>

<script lang="ts">
	let {
		class: className,
		minHeight = 200,
		ref = $bindable(null),
		children,
		...restProps
	}: ChartContainerProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("relative w-full", className)}
	style:min-height="{minHeight}px"
	data-chart-container=""
	{...restProps}
>
	{@render children?.()}
</div>