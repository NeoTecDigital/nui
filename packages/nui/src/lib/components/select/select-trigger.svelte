<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type SelectContext = {
		isOpen: () => boolean;
		toggleOpen: () => void;
		invalid: () => boolean;
		disabled: () => boolean;
		selectId: string;
	};

	type Props = WithElementRef<HTMLButtonAttributes>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<SelectContext>("select");
	
	if (!context) {
		throw new Error("SelectTrigger must be used within a Select");
	}

	$: isOpen = context.isOpen();
	$: invalid = context.invalid();
	$: disabled = context.disabled();

	function handleClick() {
		if (!disabled) {
			context.toggleOpen();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter" || event.key === "ArrowDown") {
			event.preventDefault();
			if (!disabled) {
				context.toggleOpen();
			}
		}
	}
</script>

<button
	bind:this={ref}
	data-slot="select-trigger"
	type="button"
	role="combobox"
	aria-expanded={isOpen}
	aria-controls={`${context.selectId}-content`}
	aria-haspopup="listbox"
	class={cn(
		"btn btn-outline w-full justify-between normal-case font-normal",
		{
			"btn-error": invalid,
			"btn-disabled": disabled,
		},
		className
	)}
	{disabled}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	{...restProps}
>
	{@render children?.()}
	<svg
		class="h-4 w-4 opacity-50 transition-transform duration-200"
		class:rotate-180={isOpen}
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
	</svg>
</button>