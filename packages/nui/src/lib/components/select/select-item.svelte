<script lang="ts">
	import type { HTMLOptionAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<
		HTMLOptionAttributes & {
			/**
			 * The value of the option
			 */
			value: string;
			/**
			 * The label to display (defaults to value if not provided)
			 */
			label?: string;
		}
	>;

	let {
		ref = $bindable(null),
		value: optionValue,
		label,
		class: className,
		disabled,
		children,
		...restProps
	}: Props = $props();

	const displayLabel = label || optionValue;
</script>

<option
	bind:this={ref}
	data-slot="select-item"
	value={optionValue}
	class={cn("", className)}
	{disabled}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{displayLabel}
	{/if}
</option>