<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type PopoverProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		defaultOpen?: boolean;
		modal?: boolean;
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	let {
		class: className,
		open = $bindable(),
		defaultOpen = false,
		modal = false,
		ref = $bindable(null),
		children,
		...restProps
	}: PopoverProps = $props();

	const dispatch = createEventDispatcher<{
		openChange: boolean;
	}>();

	// Initialize open state if not provided
	if (open === undefined) {
		open = defaultOpen;
	}

	const isOpen = writable(open);

	$effect(() => {
		isOpen.set(open);
	});

	function setOpen(newOpen: boolean) {
		isOpen.set(newOpen);
		open = newOpen;
		dispatch("openChange", newOpen);
	}

	// Context for child components
	setContext("popover", {
		isOpen,
		setOpen,
		modal
	});
</script>

<div
	bind:this={ref}
	class={cn("popover", className)}
	{...restProps}
>
	{@render children?.()}
</div>