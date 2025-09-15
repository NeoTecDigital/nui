<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type AccordionProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		type?: "single" | "multiple";
		value?: string | string[];
		defaultValue?: string | string[];
		disabled?: boolean;
		collapsible?: boolean;
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	let {
		class: className,
		type = "single",
		value = $bindable(),
		defaultValue,
		disabled = false,
		collapsible = false,
		ref = $bindable(null),
		children,
		...restProps
	}: AccordionProps = $props();

	const dispatch = createEventDispatcher<{
		valueChange: string | string[];
	}>();

	// Initialize value if not provided
	if (value === undefined && defaultValue !== undefined) {
		value = defaultValue;
	}

	const openItems = writable<Set<string>>(new Set());

	// Initialize open items based on value
	$effect(() => {
		if (value !== undefined) {
			if (type === "single") {
				openItems.set(new Set(typeof value === "string" ? [value] : []));
			} else {
				openItems.set(new Set(Array.isArray(value) ? value : [value]));
			}
		}
	});

	function toggleItem(itemValue: string) {
		if (disabled) return;

		const current = $openItems;
		const newSet = new Set(current);

		if (type === "single") {
			if (current.has(itemValue)) {
				if (collapsible) {
					newSet.clear();
				}
			} else {
				newSet.clear();
				newSet.add(itemValue);
			}
		} else {
			if (current.has(itemValue)) {
				newSet.delete(itemValue);
			} else {
				newSet.add(itemValue);
			}
		}

		openItems.set(newSet);

		// Update bindable value
		if (type === "single") {
			value = newSet.size > 0 ? Array.from(newSet)[0] : undefined;
		} else {
			value = Array.from(newSet);
		}

		dispatch("valueChange", value);
	}

	// Context for child components
	setContext("accordion", {
		openItems,
		toggleItem,
		disabled
	});
</script>

<div
	bind:this={ref}
	class={cn("divide-y divide-border", className)}
	{...restProps}
>
	{@render children?.()}
</div>