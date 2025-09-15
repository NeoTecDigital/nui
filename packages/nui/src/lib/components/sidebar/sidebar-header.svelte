<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const sidebarHeaderVariants = tv({
		base: "flex items-center gap-2 px-4 py-3 border-b border-base-300",
		variants: {
			variant: {
				default: "",
				sticky: "sticky top-0 bg-base-100 z-10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type SidebarHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: "default" | "sticky";
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		class: className,
		variant = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: SidebarHeaderProps = $props();

	const sidebar = getContext<{
		open: () => boolean;
		collapsible: () => string;
		isMobile: () => boolean;
	}>("sidebar");

	const isCollapsed = $derived(() => {
		if (!sidebar) return false;
		return sidebar.collapsible() === "icon" && !sidebar.open() && !sidebar.isMobile();
	});
</script>

<div
	bind:this={ref}
	class={cn(sidebarHeaderVariants({ variant }), className)}
	data-sidebar="header"
	{...restProps}
>
	{#if isCollapsed}
		<!-- Collapsed state - show only icon or minimal content -->
		<div class="w-8 h-8 flex items-center justify-center">
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>