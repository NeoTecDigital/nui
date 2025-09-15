<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type SkeletonCardProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		showAvatar?: boolean;
		showImage?: boolean;
		showTitle?: boolean;
		showDescription?: boolean;
		showActions?: boolean;
		avatarSize?: "sm" | "md" | "lg";
		descriptionLines?: number;
	};
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";
	import SkeletonText from "./skeleton-text.svelte";

	let {
		class: className,
		showAvatar = true,
		showImage = false,
		showTitle = true,
		showDescription = true,
		showActions = true,
		avatarSize = "md",
		descriptionLines = 2,
		ref = $bindable(null),
		...restProps
	}: SkeletonCardProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("border border-base-300 rounded-lg p-4 space-y-4", className)}
	data-skeleton-card=""
	{...restProps}
>
	<!-- Image -->
	{#if showImage}
		<Skeleton variant="rectangular" height="200px" />
	{/if}

	<!-- Header with avatar and title -->
	{#if showAvatar || showTitle}
		<div class="flex items-start gap-3">
			{#if showAvatar}
				<Skeleton variant="circular" size={avatarSize} />
			{/if}
			
			{#if showTitle}
				<div class="flex-1 space-y-2">
					<Skeleton variant="text" size="lg" width="60%" />
					<Skeleton variant="text" size="sm" width="40%" />
				</div>
			{/if}
		</div>
	{/if}

	<!-- Description -->
	{#if showDescription}
		<SkeletonText lines={descriptionLines} />
	{/if}

	<!-- Actions -->
	{#if showActions}
		<div class="flex gap-2 pt-2">
			<Skeleton width="80px" height="32px" />
			<Skeleton width="80px" height="32px" />
		</div>
	{/if}
</div>