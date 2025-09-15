<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import { setContext } from "svelte";

	type Props = WithElementRef<
		HTMLSelectAttributes & {
			/**
			 * The selected value
			 */
			value?: string;
			/**
			 * Whether the select is invalid
			 */
			invalid?: boolean;
			/**
			 * Placeholder text to display when no option is selected
			 */
			placeholder?: string;
			/**
			 * Callback fired when the value changes
			 */
			onValueChange?: (value: string) => void;
		}
	>;

	let {
		ref = $bindable(null),
		value = $bindable(""),
		invalid = false,
		placeholder = "Select an option...",
		onValueChange,
		id,
		class: className,
		disabled,
		children,
		...restProps
	}: Props = $props();

	const selectId = id || generateId("select");

	// Set context for select items
	setContext("select", {
		value: () => value,
		setValue: (newValue: string) => {
			value = newValue;
			onValueChange?.(newValue);
		},
		invalid: () => invalid,
		disabled: () => disabled,
		selectId,
	});

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		onValueChange?.(value);
	}
</script>

<select
	bind:this={ref}
	bind:value
	data-slot="select"
	id={selectId}
	class={cn(
		"select select-bordered w-full focus:select-primary disabled:cursor-not-allowed disabled:opacity-50",
		{
			"select-error": invalid,
		},
		className
	)}
	{disabled}
	aria-invalid={invalid}
	aria-describedby={invalid ? `${selectId}-error` : undefined}
	onchange={handleChange}
	{...restProps}
>
	{#if placeholder && !value}
		<option value="" disabled selected>{placeholder}</option>
	{/if}
	{@render children?.()}
</select>