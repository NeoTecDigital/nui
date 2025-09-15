<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type SelectContext = {
		value: () => string;
		setValue: (value: string) => void;
		disabled: () => boolean;
	};

	type Props = WithElementRef<
		HTMLAttributes<HTMLDivElement> & {
			/**
			 * The value of the option
			 */
			value: string;
			/**
			 * Whether this option is disabled
			 */
			disabled?: boolean;
		}
	>;

	let {
		ref = $bindable(null),
		value: itemValue,
		disabled: itemDisabled,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<SelectContext>("select");
	
	if (!context) {
		throw new Error("SelectItem must be used within a Select");
	}

	$: selected = context.value() === itemValue;
	$: disabled = itemDisabled || context.disabled();

	function handleClick() {
		if (!disabled) {
			context.setValue(itemValue);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	bind:this={ref}
	data-slot="select-item"
	role="option"
	aria-selected={selected}
	class={cn(
		"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
		{
			"bg-accent text-accent-content": selected,
			"opacity-50 pointer-events-none": disabled,
			"hover:bg-accent/10 focus:bg-accent/10": !selected && !disabled,
		},
		className
	)}
	tabindex={disabled ? -1 : 0}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	{...restProps}
>
	{#if selected}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<svg
				class="h-3 w-3"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</span>
	{/if}
	{@render children?.()}
</div>