<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type" | "checked"> & {
			/**
			 * The checked state of the checkbox
			 */
			checked?: boolean;
			/**
			 * Whether the checkbox is in an indeterminate state
			 */
			indeterminate?: boolean;
			/**
			 * The size of the checkbox
			 */
			size?: "xs" | "sm" | "md" | "lg";
			/**
			 * The color variant of the checkbox
			 */
			variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
			/**
			 * Whether the checkbox is invalid
			 */
			invalid?: boolean;
		}
	>;

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = false,
		size = "md",
		variant = "primary",
		invalid = false,
		id,
		class: className,
		disabled,
		...restProps
	}: Props = $props();

	const checkboxId = id || generateId("checkbox");

	// Handle indeterminate state
	$effect(() => {
		if (ref) {
			ref.indeterminate = indeterminate;
		}
	});
</script>

<input
	bind:this={ref}
	bind:checked
	data-slot="checkbox"
	type="checkbox"
	id={checkboxId}
	class={cn(
		"checkbox",
		{
			"checkbox-xs": size === "xs",
			"checkbox-sm": size === "sm", 
			"checkbox-md": size === "md",
			"checkbox-lg": size === "lg",
			"checkbox-primary": variant === "primary",
			"checkbox-secondary": variant === "secondary",
			"checkbox-accent": variant === "accent",
			"checkbox-success": variant === "success",
			"checkbox-warning": variant === "warning",
			"checkbox-error": variant === "error" || invalid,
		},
		className
	)}
	{disabled}
	aria-invalid={invalid}
	aria-describedby={invalid ? `${checkboxId}-error` : undefined}
	{...restProps}
/>