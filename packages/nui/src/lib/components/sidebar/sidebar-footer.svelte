<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const sidebarFooterVariants = tv({
		base: "px-4 py-3 border-t border-base-300 mt-auto",
		variants: {
			variant: {
				default: "",
				sticky: "sticky bottom-0 bg-base-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type SidebarFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
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
	}: SidebarFooterProps = $props();

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
	class={cn(sidebarFooterVariants({ variant }), className)}
	data-sidebar="footer"
	{...restProps}
>
	{#if isCollapsed}
		<!-- Collapsed state - show minimal footer -->
		<div class="flex items-center justify-center">
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>