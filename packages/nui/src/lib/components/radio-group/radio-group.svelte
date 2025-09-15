<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import { setContext } from "svelte";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/**
		 * The selected value in the radio group
		 */
		value?: string;
		/**
		 * The name attribute for all radio buttons in the group
		 */
		name?: string;
		/**
		 * Whether the radio group is disabled
		 */
		disabled?: boolean;
		/**
		 * Whether the radio group is in an invalid state
		 */
		invalid?: boolean;
		/**
		 * The size of radio buttons in the group
		 */
		size?: "xs" | "sm" | "md" | "lg";
		/**
		 * The color variant of radio buttons in the group
		 */
		variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
		/**
		 * Callback fired when the value changes
		 */
		onValueChange?: (value: string) => void;
	};

	let {
		ref = $bindable(null),
		value = $bindable(""),
		name,
		disabled = false,
		invalid = false,
		size = "md",
		variant = "primary",
		onValueChange,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const groupName = name || generateId("radio-group");
	const groupId = generateId("radio-group");

	// Set context for radio group items
	setContext("radio-group", {
		value: () => value,
		setValue: (newValue: string) => {
			value = newValue;
			onValueChange?.(newValue);
		},
		name: groupName,
		disabled: () => disabled,
		invalid: () => invalid,
		size: () => size,
		variant: () => variant,
		groupId,
	});
</script>

<div
	bind:this={ref}
	data-slot="radio-group"
	role="radiogroup"
	id={groupId}
	class={cn("flex flex-col gap-2", className)}
	aria-invalid={invalid}
	aria-describedby={invalid ? `${groupId}-error` : undefined}
	{...restProps}
>
	{@render children?.()}
</div>