<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	import { getNavigationItemContext } from "./navigation-menu-item.svelte";

	export const navigationContentVariants = tv({
		base: "absolute top-full left-0 w-full bg-base-100 border border-base-300 shadow-lg z-50",
		variants: {
			size: {
				sm: "p-2",
				default: "p-4",
				lg: "p-6",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type NavigationMenuContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof navigationContentVariants>;

	let {
		class: className,
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuContentProps = $props();

	const { contentId, triggerId, isActive } = getNavigationItemContext();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			// Return focus to trigger
			document.getElementById(triggerId)?.focus();
		}
	}
</script>

{#if isActive}
	<div
		bind:this={ref}
		id={contentId}
		role="region"
		aria-labelledby={triggerId}
		class={cn(navigationContentVariants({ size }), className)}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}