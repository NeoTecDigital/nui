<script lang="ts" module>
	import { cn, trapFocus, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type PopoverContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		align?: "start" | "center" | "end";
		alignOffset?: number;
		forceMount?: boolean;
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		side = "bottom",
		sideOffset = 4,
		align = "center",
		alignOffset = 0,
		forceMount = false,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: PopoverContentProps = $props();

	const popoverContext = getContext("popover") as {
		isOpen: Writable<boolean>;
		setOpen: (open: boolean) => void;
		modal: boolean;
	};

	const shouldRender = $derived(forceMount || $popoverContext.isOpen);

	let cleanupFocusTrap: (() => void) | undefined;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			popoverContext.setOpen(false);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (ref && !ref.contains(event.target as Node)) {
			popoverContext.setOpen(false);
		}
	}

	// Set up focus trap and click outside handling when open
	$effect(() => {
		if ($popoverContext.isOpen && ref) {
			// Set up focus trap for modal popovers
			if (popoverContext.modal) {
				cleanupFocusTrap = trapFocus(ref);
			}

			// Set up click outside handler
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeydown);

			return () => {
				cleanupFocusTrap?.();
				document.removeEventListener("mousedown", handleClickOutside);
				document.removeEventListener("keydown", handleKeydown);
			};
		}
	});

	// Calculate positioning classes based on side and align
	const positionClasses = $derived(() => {
		const baseClasses = "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in";
		
		let sideClasses = "";
		switch (side) {
			case "top":
				sideClasses = "bottom-full mb-1 data-[side=top]:slide-in-from-bottom-2";
				break;
			case "right":
				sideClasses = "left-full ml-1 data-[side=right]:slide-in-from-left-2";
				break;
			case "bottom":
				sideClasses = "top-full mt-1 data-[side=bottom]:slide-in-from-top-2";
				break;
			case "left":
				sideClasses = "right-full mr-1 data-[side=left]:slide-in-from-right-2";
				break;
		}

		let alignClasses = "";
		switch (align) {
			case "start":
				alignClasses = side === "top" || side === "bottom" ? "left-0" : "top-0";
				break;
			case "center":
				alignClasses = side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2";
				break;
			case "end":
				alignClasses = side === "top" || side === "bottom" ? "right-0" : "bottom-0";
				break;
		}

		return `${baseClasses} ${sideClasses} ${alignClasses}`;
	});
</script>

{#if shouldRender}
	{#if asChild}
		{@render children?.()}
	{:else}
		<div
			bind:this={ref}
			class={cn(positionClasses, className)}
			role={popoverContext.modal ? "dialog" : "tooltip"}
			aria-modal={popoverContext.modal}
			data-state={$popoverContext.isOpen ? "open" : "closed"}
			data-side={side}
			data-align={align}
			tabindex={-1}
			{...restProps}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}