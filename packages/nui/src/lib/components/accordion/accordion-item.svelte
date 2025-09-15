<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type AccordionItemProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, setContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		value,
		disabled = false,
		ref = $bindable(null),
		children,
		...restProps
	}: AccordionItemProps = $props();

	const accordionContext = getContext("accordion") as {
		openItems: Writable<Set<string>>;
		toggleItem: (value: string) => void;
		disabled: boolean;
	};

	const isOpen = $derived(accordionContext.openItems && $accordionContext.openItems.has(value));
	const isDisabled = $derived(disabled || accordionContext.disabled);

	// Context for trigger and content
	setContext("accordionItem", {
		value,
		isOpen,
		isDisabled,
		toggle: () => accordionContext.toggleItem(value)
	});
</script>

<div
	bind:this={ref}
	class={cn("collapse", isOpen && "collapse-open", className)}
	{...restProps}
>
	{@render children?.()}
</div>