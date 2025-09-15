<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TooltipTriggerProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TooltipTriggerProps = $props();

	const tooltipContext = getContext("tooltip") as {
		isOpen: Writable<boolean>;
		setOpen: (open: boolean) => void;
		scheduleOpen: () => void;
		scheduleClose: () => void;
		contentId: string;
		disableHoverableContent: boolean;
	};

	function handlePointerEnter() {
		tooltipContext.scheduleOpen();
	}

	function handlePointerLeave() {
		tooltipContext.scheduleClose();
	}

	function handleFocus() {
		tooltipContext.setOpen(true);
	}

	function handleBlur() {
		tooltipContext.setOpen(false);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			tooltipContext.setOpen(false);
		}
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		type="button"
		class={cn("tooltip-trigger", className)}
		aria-describedby={$tooltipContext.isOpen ? tooltipContext.contentId : undefined}
		data-state={$tooltipContext.isOpen ? "open" : "closed"}
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}