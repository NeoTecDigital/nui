<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const commandItemVariants = tv({
		base: "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors aria-selected:bg-accent aria-selected:text-accent-content data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		variants: {
			variant: {
				default: "hover:bg-base-200",
				destructive: "text-error hover:bg-error/10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CommandItemVariant = VariantProps<typeof commandItemVariants>["variant"];

	export type CommandItemProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: CommandItemVariant;
		value?: string;
		disabled?: boolean;
		onSelect?: (value: string) => void;
		keywords?: string[];
	};
</script>

<script lang="ts">
	import { getContext, onMount, onDestroy } from "svelte";

	let {
		class: className,
		variant = "default",
		value = "",
		disabled = false,
		onSelect,
		keywords = [],
		ref = $bindable(null),
		children,
		...restProps
	}: CommandItemProps = $props();

	const COMMAND_CONTEXT_KEY = Symbol("command");
	const context = getContext<any>(COMMAND_CONTEXT_KEY);

	function handleClick() {
		if (!disabled) {
			if (context) {
				context.onValueChange(value);
			}
			onSelect?.(value);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
	}

	// Register item with context for filtering and navigation
	onMount(() => {
		if (context && ref) {
			context.items.set(value, ref);
		}
	});

	onDestroy(() => {
		if (context) {
			context.items.delete(value);
		}
	});

	// Calculate visibility based on search
	const isVisible = $derived(() => {
		if (!context || !context.shouldFilter || !context.search) return true;
		
		const searchTerms = [value, ...keywords].join(" ");
		const score = context.filter(searchTerms, context.search);
		return score > 0;
	});

	const isSelected = $derived(() => {
		return context?.value === value;
	});
</script>

{#if isVisible}
	<div
		bind:this={ref}
		data-slot="command-item"
		data-value={value}
		data-disabled={disabled}
		class={cn(commandItemVariants({ variant }), className)}
		role="option"
		aria-selected={isSelected}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}