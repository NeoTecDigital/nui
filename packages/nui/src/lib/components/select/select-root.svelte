<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import { setContext } from "svelte";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/**
		 * The selected value
		 */
		value?: string;
		/**
		 * Whether the select is open
		 */
		open?: boolean;
		/**
		 * Whether the select is disabled
		 */
		disabled?: boolean;
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
		/**
		 * Callback fired when the open state changes
		 */
		onOpenChange?: (open: boolean) => void;
	};

	let {
		ref = $bindable(null),
		value = $bindable(""),
		open = $bindable(false),
		disabled = false,
		invalid = false,
		placeholder = "Select an option...",
		onValueChange,
		onOpenChange,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const selectId = generateId("select");

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (ref && !ref.contains(event.target as Node)) {
			if (open) {
				open = false;
				onOpenChange?.(false);
			}
		}
	}

	// Handle escape key
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape" && open) {
			open = false;
			onOpenChange?.(false);
		}
	}

	// Set up event listeners
	$effect(() => {
		if (typeof window !== "undefined") {
			document.addEventListener("click", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("click", handleClickOutside);
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	});

	// Set context for child components
	setContext("select", {
		value: () => value,
		setValue: (newValue: string) => {
			value = newValue;
			open = false;
			onValueChange?.(newValue);
			onOpenChange?.(false);
		},
		isOpen: () => open,
		toggleOpen: () => {
			if (!disabled) {
				open = !open;
				onOpenChange?.(open);
			}
		},
		invalid: () => invalid,
		disabled: () => disabled,
		selectId,
		placeholder,
	});
</script>

<div
	bind:this={ref}
	data-slot="select-root"
	class={cn("dropdown w-full", { "dropdown-open": open }, className)}
	{...restProps}
>
	{@render children?.()}
</div>