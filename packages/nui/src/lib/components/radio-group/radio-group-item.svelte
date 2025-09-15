<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type RadioGroupContext = {
		value: () => string;
		setValue: (value: string) => void;
		name: string;
		disabled: () => boolean;
		invalid: () => boolean;
		size: () => "xs" | "sm" | "md" | "lg";
		variant: () => "primary" | "secondary" | "accent" | "success" | "warning" | "error";
		groupId: string;
	};

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type" | "checked" | "name"> & {
			/**
			 * The value of this radio button
			 */
			value: string;
			/**
			 * Whether this radio button is disabled (overrides group disabled state)
			 */
			disabled?: boolean;
		}
	>;

	let {
		ref = $bindable(null),
		value: itemValue,
		disabled: itemDisabled,
		id,
		class: className,
		...restProps
	}: Props = $props();

	const context = getContext<RadioGroupContext>("radio-group");
	
	if (!context) {
		throw new Error("RadioGroupItem must be used within a RadioGroup");
	}

	const radioId = id || generateId("radio");
	
	$: checked = context.value() === itemValue;
	$: disabled = itemDisabled ?? context.disabled();
	$: invalid = context.invalid();
	$: size = context.size();
	$: variant = context.variant();

	function handleChange() {
		if (!disabled) {
			context.setValue(itemValue);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			handleChange();
		}
	}
</script>

<input
	bind:this={ref}
	data-slot="radio-group-item"
	type="radio"
	id={radioId}
	name={context.name}
	value={itemValue}
	{checked}
	{disabled}
	class={cn(
		"radio",
		{
			"radio-xs": size === "xs",
			"radio-sm": size === "sm",
			"radio-md": size === "md", 
			"radio-lg": size === "lg",
			"radio-primary": variant === "primary",
			"radio-secondary": variant === "secondary",
			"radio-accent": variant === "accent", 
			"radio-success": variant === "success",
			"radio-warning": variant === "warning",
			"radio-error": variant === "error" || invalid,
		},
		className
	)}
	aria-invalid={invalid}
	aria-describedby={invalid ? `${context.groupId}-error` : undefined}
	onchange={handleChange}
	onkeydown={handleKeyDown}
	{...restProps}
/>