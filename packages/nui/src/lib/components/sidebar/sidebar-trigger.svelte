<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const sidebarTriggerVariants = tv({
		base: "btn btn-ghost btn-square",
		variants: {
			size: {
				sm: "btn-sm",
				md: "btn-md",
				lg: "btn-lg",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type SidebarTriggerProps = WithElementRef<HTMLButtonAttributes> & {
		size?: "sm" | "md" | "lg";
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		class: className,
		size = "md",
		ref = $bindable(null),
		children,
		...restProps
	}: SidebarTriggerProps = $props();

	const sidebar = getContext<{
		toggle: () => void;
	}>("sidebar");

	function handleClick() {
		sidebar?.toggle();
	}
</script>

<button
	bind:this={ref}
	type="button"
	class={cn(sidebarTriggerVariants({ size }), className)}
	on:click={handleClick}
	aria-label="Toggle sidebar"
	data-sidebar="trigger"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- Default hamburger icon -->
		<svg
			class="w-5 h-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	{/if}
</button>