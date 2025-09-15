<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type SkeletonTextProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		lines?: number;
		spacing?: string;
		lastLineWidth?: string;
	};
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";

	let {
		class: className,
		lines = 3,
		spacing = "0.5rem",
		lastLineWidth = "75%",
		ref = $bindable(null),
		...restProps
	}: SkeletonTextProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("space-y-2", className)}
	data-skeleton-text=""
	{...restProps}
>
	{#each Array(lines) as _, index}
		<Skeleton
			variant="text"
			width={index === lines - 1 ? lastLineWidth : "100%"}
			style="margin-bottom: {spacing}"
		/>
	{/each}
</div>