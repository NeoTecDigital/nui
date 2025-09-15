<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const sidebarVariants = tv({
		base: "drawer-side z-40",
		variants: {
			variant: {
				default: "",
				inset: "border-r border-base-300",
				floating: "m-4 rounded-lg border border-base-300 shadow-lg",
			},
			side: {
				left: "",
				right: "",
			},
		},
		defaultVariants: {
			variant: "default", 
			side: "left",
		},
	});

	export type SidebarProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		collapsible?: "offcanvas" | "icon" | "none";
		variant?: "default" | "inset" | "floating";
		side?: "left" | "right";
		onOpenChange?: (open: boolean) => void;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, setContext, onMount } from "svelte";

	let {
		class: className,
		open = $bindable(false),
		collapsible = "offcanvas",
		variant = "default",
		side = "left",
		onOpenChange,
		ref = $bindable(null),
		children,
		...restProps
	}: SidebarProps = $props();

	const dispatch = createEventDispatcher<{
		openChange: boolean;
	}>();

	// Mobile detection
	let isMobile = $state(false);

	function checkMobile() {
		isMobile = window.innerWidth < 768; // md breakpoint
	}

	onMount(() => {
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	});

	// Provide sidebar context to child components
	setContext("sidebar", {
		open: () => open,
		collapsible: () => collapsible,
		variant: () => variant,
		side: () => side,
		isMobile: () => isMobile,
		toggle: () => {
			open = !open;
			onOpenChange?.(open);
			dispatch("openChange", open);
		},
		setOpen: (value: boolean) => {
			open = value;
			onOpenChange?.(open);
			dispatch("openChange", open);
		},
	});

	// Handle backdrop click for mobile
	function handleBackdropClick() {
		if (isMobile && collapsible === "offcanvas") {
			open = false;
			onOpenChange?.(open);
			dispatch("openChange", open);
		}
	}

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && open && isMobile) {
			open = false;
			onOpenChange?.(open);
			dispatch("openChange", open);
		}
	}

	// Classes for the sidebar container
	const sidebarClasses = $derived(() => {
		let classes = cn(sidebarVariants({ variant, side }), className);
		
		if (collapsible === "icon" && !open) {
			classes += " w-16";
		} else {
			classes += " w-64";
		}
		
		return classes;
	});

	// Desktop behavior
	const isDesktop = $derived(() => !isMobile);
	const shouldShowOverlay = $derived(() => isMobile && open && collapsible === "offcanvas");
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isMobile && collapsible === "offcanvas"}
	<!-- Mobile drawer implementation -->
	<div class="drawer" class:drawer-open={open}>
		<input
			id="sidebar-drawer"
			type="checkbox"
			class="drawer-toggle"
			bind:checked={open}
		/>
		
		<!-- Backdrop -->
		{#if shouldShowOverlay}
			<div
				class="drawer-overlay fixed inset-0 bg-black/50 z-30"
				on:click={handleBackdropClick}
				role="button"
				tabindex="-1"
				aria-label="Close sidebar"
			></div>
		{/if}
		
		<!-- Sidebar content -->
		<div
			bind:this={ref}
			class={sidebarClasses}
			data-sidebar="root"
			{...restProps}
		>
			<div class="min-h-full bg-base-100 w-64">
				{@render children?.()}
			</div>
		</div>
	</div>
{:else}
	<!-- Desktop sidebar -->
	<div
		bind:this={ref}
		class={cn(
			"fixed top-0 h-full bg-base-100 transition-all duration-300 ease-in-out",
			side === "left" ? "left-0" : "right-0",
			variant === "inset" && "border-r border-base-300",
			variant === "floating" && "m-4 rounded-lg border border-base-300 shadow-lg",
			collapsible === "icon" && !open && "w-16",
			(collapsible !== "icon" || open) && "w-64",
			!open && collapsible === "offcanvas" && (side === "left" ? "-translate-x-full" : "translate-x-full"),
			className
		)}
		data-sidebar="root"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}