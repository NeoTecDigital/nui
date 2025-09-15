<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type AccordionContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
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
	}: AccordionContentProps = $props();

	const itemContext = getContext("accordionItem") as {
		value: string;
		isOpen: boolean;
		isDisabled: boolean;
		toggle: () => void;
	};
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<div
		bind:this={ref}
		class={cn(
			"collapse-content overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
			className
		)}
		id={`accordion-content-${itemContext.value}`}
		role="region"
		aria-labelledby={`accordion-trigger-${itemContext.value}`}
		data-state={itemContext.isOpen ? "open" : "closed"}
		{...restProps}
	>
		<div class="pb-4 pt-0">
			{@render children?.()}
		</div>
	</div>
{/if}