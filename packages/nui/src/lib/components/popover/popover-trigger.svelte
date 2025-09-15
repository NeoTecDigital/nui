<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	export type PopoverTriggerProps = WithElementRef<HTMLButtonAttributes> & {
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
	}: PopoverTriggerProps = $props();

	const popoverContext = getContext("popover") as {
		isOpen: Writable<boolean>;
		setOpen: (open: boolean) => void;
		modal: boolean;
	};

	function handleClick() {
		popoverContext.setOpen(!$popoverContext.isOpen);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
		if (event.key === "Escape" && $popoverContext.isOpen) {
			popoverContext.setOpen(false);
		}
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		type="button"
		class={cn("popover-trigger", className)}
		aria-expanded={$popoverContext.isOpen}
		aria-haspopup="dialog"
		data-state={$popoverContext.isOpen ? "open" : "closed"}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}