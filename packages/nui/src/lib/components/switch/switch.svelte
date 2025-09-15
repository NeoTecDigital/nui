<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type" | "checked"> & {
			/**
			 * The checked state of the switch
			 */
			checked?: boolean;
			/**
			 * The size of the switch
			 */
			size?: "xs" | "sm" | "md" | "lg";
			/**
			 * The color variant of the switch
			 */
			variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
			/**
			 * Whether the switch is invalid
			 */
			invalid?: boolean;
			/**
			 * Callback fired when the checked state changes
			 */
			onCheckedChange?: (checked: boolean) => void;
		}
	>;

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		size = "md",
		variant = "primary",
		invalid = false,
		onCheckedChange,
		id,
		class: className,
		disabled,
		...restProps
	}: Props = $props();

	const switchId = id || generateId("switch");

	function handleChange() {
		if (!disabled) {
			checked = !checked;
			onCheckedChange?.(checked);
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
	data-slot="switch"
	type="checkbox"
	id={switchId}
	bind:checked
	class={cn(
		"toggle",
		{
			"toggle-xs": size === "xs",
			"toggle-sm": size === "sm",
			"toggle-md": size === "md",
			"toggle-lg": size === "lg",
			"toggle-primary": variant === "primary",
			"toggle-secondary": variant === "secondary",
			"toggle-accent": variant === "accent",
			"toggle-success": variant === "success",
			"toggle-warning": variant === "warning",
			"toggle-error": variant === "error" || invalid,
		},
		className
	)}
	{disabled}
	aria-invalid={invalid}
	aria-describedby={invalid ? `${switchId}-error` : undefined}
	onchange={handleChange}
	onkeydown={handleKeyDown}
	{...restProps}
/>