<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	export type CollapsibleTriggerProps = WithElementRef<HTMLButtonAttributes> & {
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
	}: CollapsibleTriggerProps = $props();

	const collapsibleContext = getContext("collapsible") as {
		isOpen: Writable<boolean>;
		toggle: () => void;
		disabled: boolean;
	};

	function handleClick() {
		collapsibleContext.toggle();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		type="button"
		class={cn(
			"collapse-title flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
			"[&[data-state=open]>svg]:rotate-180",
			className
		)}
		disabled={collapsibleContext.disabled}
		aria-expanded={$collapsibleContext.isOpen}
		aria-controls="collapsible-content"
		data-state={$collapsibleContext.isOpen ? "open" : "closed"}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}