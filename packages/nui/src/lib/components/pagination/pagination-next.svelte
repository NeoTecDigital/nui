<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	export type PaginationNextProps = (
		| (WithElementRef<HTMLButtonAttributes> & { href?: never })
		| (WithElementRef<HTMLAnchorAttributes> & { href: string })
	) & {
		disabled?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		disabled = false,
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationNextProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="pagination-next"
		class={cn("btn btn-sm btn-ghost gap-1 pr-2.5", disabled && "btn-disabled", className)}
		{href}
		aria-label="Go to next page"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else}
			Next
		{/if}
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="pagination-next"
		class={cn("btn btn-sm btn-ghost gap-1 pr-2.5", className)}
		{disabled}
		aria-label="Go to next page"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else}
			Next
		{/if}
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>
{/if}