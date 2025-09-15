<script lang="ts" module>
	import type { HTMLButtonAttributes, HTMLLabelAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DrawerTriggerProps = (WithElementRef<HTMLButtonAttributes> | WithElementRef<HTMLLabelAttributes>) & {
		asChild?: boolean;
		asLabel?: boolean; // Use label element for native drawer checkbox behavior
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		asChild = false,
		asLabel = false,
		children,
		onclick,
		...restProps
	}: DrawerTriggerProps = $props();

	const drawer = getContext("drawer");

	if (!drawer) {
		throw new Error("DrawerTrigger must be used within a Drawer component");
	}

	function handleClick(e: MouseEvent) {
		drawer.toggleDrawer();
		onclick?.(e);
	}
</script>

{#if asChild}
	{@render children?.()}
{:else if asLabel}
	<label
		bind:this={ref}
		data-slot="drawer-trigger"
		class={cn("btn drawer-button", className)}
		for={drawer.drawerId}
		aria-haspopup="true"
		aria-expanded={$drawer.open}
		aria-controls={drawer.drawerId}
		{...restProps}
	>
		{@render children?.()}
	</label>
{:else}
	<button
		bind:this={ref}
		data-slot="drawer-trigger"
		class={cn("btn", className)}
		onclick={handleClick}
		aria-haspopup="true"
		aria-expanded={$drawer.open}
		aria-controls={drawer.drawerId}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}