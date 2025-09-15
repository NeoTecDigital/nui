<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	export type AccordionTriggerProps = WithElementRef<HTMLButtonAttributes> & {
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		class: className,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: AccordionTriggerProps = $props();

	const itemContext = getContext("accordionItem") as {
		value: string;
		isOpen: boolean;
		isDisabled: boolean;
		toggle: () => void;
	};

	function handleClick() {
		if (!itemContext.isDisabled) {
			itemContext.toggle();
		}
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
		disabled={itemContext.isDisabled}
		aria-expanded={itemContext.isOpen}
		aria-controls={`accordion-content-${itemContext.value}`}
		data-state={itemContext.isOpen ? "open" : "closed"}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
		<svg class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" /></svg>
	</button>
{/if}