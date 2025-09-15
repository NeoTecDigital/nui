<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, trapFocus, type WithElementRef } from "$lib/utils.js";

	export type DrawerContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, tick } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		closeOnOutsideClick = true,
		closeOnEscape = true,
		children,
		...restProps
	}: DrawerContentProps = $props();

	const drawer = getContext("drawer");

	if (!drawer) {
		throw new Error("DrawerContent must be used within a Drawer component");
	}

	let contentRef: HTMLDivElement;
	let cleanupFocusTrap: (() => void) | null = null;

	// Handle focus trap when drawer opens (only in modal mode)
	$effect(() => {
		if ($drawer.open && drawer.modal && contentRef) {
			tick().then(() => {
				cleanupFocusTrap = trapFocus(contentRef);
			});
		} else if (cleanupFocusTrap) {
			cleanupFocusTrap();
			cleanupFocusTrap = null;
		}

		return () => {
			if (cleanupFocusTrap) {
				cleanupFocusTrap();
			}
		};
	});

	function handleOverlayClick(e: MouseEvent) {
		if (closeOnOutsideClick && drawer.modal && e.target === e.currentTarget) {
			drawer.closeDrawer();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && drawer.modal && e.key === "Escape") {
			drawer.closeDrawer();
		}
	}
</script>

<!-- Hidden checkbox input for drawer state -->
<input
	type="checkbox"
	id={drawer.drawerId}
	class="drawer-toggle"
	bind:checked={$drawer.open}
	aria-hidden="true"
/>

<!-- Main content area (when drawer is closed) -->
<div class="drawer-content flex flex-col">
	{@render children?.()}
</div>

<!-- Drawer sidebar -->
<div class="drawer-side z-50">
	<!-- Overlay for modal drawers -->
	{#if drawer.modal}
		<label
			class="drawer-overlay"
			for={drawer.drawerId}
			onclick={handleOverlayClick}
			onkeydown={handleKeydown}
			role="presentation"
			aria-hidden="true"
		></label>
	{/if}
	
	<!-- Drawer content -->
	<aside
		bind:this={contentRef}
		bind:this={ref}
		data-slot="drawer-content"
		class={cn(
			"bg-base-200 text-base-content min-h-full w-80 p-4",
			className
		)}
		role={drawer.modal ? "dialog" : "complementary"}
		aria-modal={drawer.modal}
		aria-labelledby={drawer.titleId}
		aria-describedby={drawer.descriptionId}
		tabindex={drawer.modal ? "-1" : undefined}
		{...restProps}
	>
		{@render children?.()}
	</aside>
</div>