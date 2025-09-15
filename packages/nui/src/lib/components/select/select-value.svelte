<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type SelectContext = {
		value: () => string;
		placeholder?: string;
	};

	type Props = WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
		/**
		 * Placeholder text to display when no value is selected
		 */
		placeholder?: string;
	};

	let {
		ref = $bindable(null),
		placeholder: localPlaceholder,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<SelectContext>("select");
	
	if (!context) {
		throw new Error("SelectValue must be used within a Select");
	}

	$: value = context.value();
	$: placeholder = localPlaceholder || context.placeholder || "Select an option...";
</script>

<span
	bind:this={ref}
	data-slot="select-value"
	class={cn(
		"block truncate text-left",
		{
			"text-base-content/50": !value,
		},
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if value}
		{value}
	{:else}
		{placeholder}
	{/if}
</span>