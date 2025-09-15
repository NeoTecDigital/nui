<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	import { getContextMenuContext } from "./context-menu.svelte";

	export const contextItemVariants = tv({
		base: "rounded-lg focus:bg-base-300 focus:outline-none",
		variants: {
			destructive: {
				true: "text-error hover:bg-error hover:text-error-content",
			},
			disabled: {
				true: "opacity-50 pointer-events-none",
			},
		},
	});

	export type ContextMenuItemProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof contextItemVariants> & {
			href?: string;
			disabled?: boolean;
		};

	let {
		class: className,
		destructive = false,
		disabled = false,
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: ContextMenuItemProps = $props();

	const { close } = getContextMenuContext();

	function handleClick() {
		if (!disabled) {
			close();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			if (!disabled) {
				if (href) {
					window.location.href = href;
				}
				close();
			}
		}
	}
</script>

{#if href && !disabled}
	<a
		bind:this={ref}
		{href}
		role="menuitem"
		tabindex={disabled ? -1 : 0}
		class={cn(contextItemVariants({ destructive, disabled }), className)}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<div
		bind:this={ref}
		role="menuitem"
		tabindex={disabled ? -1 : 0}
		class={cn(contextItemVariants({ destructive, disabled }), className)}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}