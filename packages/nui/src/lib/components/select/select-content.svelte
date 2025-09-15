<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type SelectContext = {
		isOpen: () => boolean;
		invalid: () => boolean;
		disabled: () => boolean;
	};

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/**
		 * The position of the content relative to the trigger
		 */
		side?: "top" | "bottom" | "left" | "right";
		/**
		 * The alignment of the content relative to the trigger
		 */
		align?: "start" | "center" | "end";
		/**
		 * The distance from the trigger
		 */
		sideOffset?: number;
	};

	let {
		ref = $bindable(null),
		side = "bottom",
		align = "start", 
		sideOffset = 4,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<SelectContext>("select");
	
	$: isOpen = context?.isOpen?.() ?? false;
	$: invalid = context?.invalid?.() ?? false;
	$: disabled = context?.disabled?.() ?? false;
</script>

{#if isOpen && !disabled}
	<div
		bind:this={ref}
		data-slot="select-content"
		role="listbox"
		class={cn(
			"dropdown-content z-50 min-w-32 overflow-hidden rounded-md border bg-base-100 p-1 shadow-md animate-in fade-in-0 zoom-in-95",
			{
				"border-error": invalid,
			},
			className
		)}
		style="--offset: {sideOffset}px;"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}