<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type SkeletonListProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		items?: number;
		showAvatar?: boolean;
		showIcon?: boolean;
		avatarSize?: "sm" | "md" | "lg";
		spacing?: string;
	};
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";

	let {
		class: className,
		items = 5,
		showAvatar = true,
		showIcon = false,
		avatarSize = "md",
		spacing = "1rem",
		ref = $bindable(null),
		...restProps
	}: SkeletonListProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("space-y-4", className)}
	style="gap: {spacing}"
	data-skeleton-list=""
	{...restProps}
>
	{#each Array(items) as _, index}
		<div class="flex items-center gap-3">
			{#if showAvatar}
				<Skeleton variant="circular" size={avatarSize} />
			{:else if showIcon}
				<Skeleton width="20px" height="20px" />
			{/if}
			
			<div class="flex-1 space-y-2">
				<Skeleton variant="text" size="md" width={`${60 + Math.random() * 30}%`} />
				<Skeleton variant="text" size="sm" width={`${40 + Math.random() * 20}%`} />
			</div>
		</div>
	{/each}
</div>