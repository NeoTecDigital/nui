<script lang="ts" module>
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type TooltipProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		defaultOpen?: boolean;
		delayDuration?: number;
		disableHoverableContent?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { writable } from "svelte/store";

	let {
		class: className,
		open = $bindable(),
		defaultOpen = false,
		delayDuration,
		disableHoverableContent,
		ref = $bindable(null),
		children,
		...restProps
	}: TooltipProps = $props();

	const dispatch = createEventDispatcher<{
		openChange: boolean;
	}>();

	const providerContext = getContext("tooltipProvider") as {
		delayDuration: number;
		skipDelayDuration: number;
		disableHoverableContent: boolean;
	} | undefined;

	// Use provider defaults if not overridden
	const finalDelayDuration = delayDuration ?? providerContext?.delayDuration ?? 700;
	const finalDisableHoverableContent = disableHoverableContent ?? providerContext?.disableHoverableContent ?? false;

	// Initialize open state if not provided
	if (open === undefined) {
		open = defaultOpen;
	}

	const isOpen = writable(open);
	const contentId = generateId("tooltip-content");

	let openTimeout: ReturnType<typeof setTimeout> | null = null;
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		isOpen.set(open);
	});

	function clearTimeouts() {
		if (openTimeout) {
			clearTimeout(openTimeout);
			openTimeout = null;
		}
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}

	function setOpen(newOpen: boolean) {
		clearTimeouts();
		isOpen.set(newOpen);
		open = newOpen;
		dispatch("openChange", newOpen);
	}

	function scheduleOpen() {
		clearTimeouts();
		openTimeout = setTimeout(() => {
			setOpen(true);
		}, finalDelayDuration);
	}

	function scheduleClose() {
		clearTimeouts();
		closeTimeout = setTimeout(() => {
			setOpen(false);
		}, 150);
	}

	// Context for child components
	setContext("tooltip", {
		isOpen,
		setOpen,
		scheduleOpen,
		scheduleClose,
		contentId,
		disableHoverableContent: finalDisableHoverableContent
	});
</script>

<div
	bind:this={ref}
	class={cn("tooltip", className)}
	{...restProps}
>
	{@render children?.()}
</div>