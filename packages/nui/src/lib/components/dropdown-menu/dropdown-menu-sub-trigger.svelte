<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getDropdownSubContext } from "./dropdown-menu-sub.svelte";

	export type DropdownMenuSubTriggerProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuSubTriggerProps = $props();

	const { open, toggle, contentId, triggerId } = getDropdownSubContext();

	function handleClick() {
		toggle();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggle();
		} else if (event.key === "ArrowRight" && !open) {
			event.preventDefault();
			toggle();
		} else if (event.key === "ArrowLeft" && open) {
			event.preventDefault();
			getDropdownSubContext().close();
		}
	}

	function handleMouseEnter() {
		if (!open) {
			toggle();
		}
	}

	function handleMouseLeave() {
		if (open) {
			getDropdownSubContext().close();
		}
	}
</script>

<div
	bind:this={ref}
	id={triggerId}
	role="menuitem"
	tabindex={0}
	class={cn("rounded-lg focus:bg-base-300 focus:outline-none flex items-center justify-between", className)}
	aria-expanded={open}
	aria-haspopup="menu"
	aria-controls={contentId}
	onclick={handleClick}
	onkeydown={handleKeydown}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	{...restProps}
>
	{@render children?.()}
	<svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
	</svg>
</div>