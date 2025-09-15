<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type PaginationEllipsisProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationEllipsisProps = $props();
</script>

<span
	bind:this={ref}
	data-slot="pagination-ellipsis"
	class={cn("flex h-9 w-9 items-center justify-center", className)}
	aria-hidden="true"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="1"></circle>
			<circle cx="19" cy="12" r="1"></circle>
			<circle cx="5" cy="12" r="1"></circle>
		</svg>
		<span class="sr-only">More pages</span>
	{/if}
</span>