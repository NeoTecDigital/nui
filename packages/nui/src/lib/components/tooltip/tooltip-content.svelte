<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TooltipContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		align?: "start" | "center" | "end";
		alignOffset?: number;
		forceMount?: boolean;
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		side = "top",
		sideOffset = 4,
		align = "center",
		alignOffset = 0,
		forceMount = false,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TooltipContentProps = $props();

	const tooltipContext = getContext("tooltip") as {
		isOpen: Writable<boolean>;
		setOpen: (open: boolean) => void;
		scheduleOpen: () => void;
		scheduleClose: () => void;
		contentId: string;
		disableHoverableContent: boolean;
	};

	const shouldRender = $derived(forceMount || $tooltipContext.isOpen);

	function handlePointerEnter() {
		if (!tooltipContext.disableHoverableContent) {
			tooltipContext.setOpen(true);
		}
	}

	function handlePointerLeave() {
		if (!tooltipContext.disableHoverableContent) {
			tooltipContext.scheduleClose();
		}
	}

	// Calculate positioning classes based on side and align
	const positionClasses = $derived(() => {
		const baseClasses = "absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95";
		
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
			id={tooltipContext.contentId}
			role="tooltip"
			data-state={$tooltipContext.isOpen ? "open" : "closed"}
			data-side={side}
			data-align={align}
			style="--radix-tooltip-content-transform-origin: var(--radix-popper-transform-origin); --radix-tooltip-content-available-width: var(--radix-popper-available-width); --radix-tooltip-content-available-height: var(--radix-popper-available-height); --radix-tooltip-trigger-width: var(--radix-popper-anchor-width); --radix-tooltip-trigger-height: var(--radix-popper-anchor-height);"
			onpointerenter={handlePointerEnter}
			onpointerleave={handlePointerLeave}
			{...restProps}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}