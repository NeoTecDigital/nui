<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type CollapsibleProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		defaultOpen?: boolean;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	let {
		class: className,
		open = $bindable(),
		defaultOpen = false,
		disabled = false,
		ref = $bindable(null),
		children,
		...restProps
	}: CollapsibleProps = $props();

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

	function toggle() {
		if (disabled) return;
		
		const newState = !$isOpen;
		isOpen.set(newState);
		open = newState;
		dispatch("openChange", newState);
	}

	// Context for child components
	setContext("collapsible", {
		isOpen,
		toggle,
		disabled
	});
</script>

<div
	bind:this={ref}
	class={cn("collapse", $isOpen && "collapse-open", className)}
	data-state={$isOpen ? "open" : "closed"}
	{...restProps}
>
	{@render children?.()}
</div>