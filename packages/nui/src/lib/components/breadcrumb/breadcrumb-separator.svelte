<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type BreadcrumbSeparatorProps = WithElementRef<HTMLAttributes<HTMLLIElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbSeparatorProps = $props();
</script>

<li
	bind:this={ref}
	role="presentation"
	aria-hidden="true"
	class={cn("text-base-content/50", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	{/if}
</li>