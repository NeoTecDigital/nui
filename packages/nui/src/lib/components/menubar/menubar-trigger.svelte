<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getMenubarContext } from "./menubar.svelte";
	import { getMenubarMenuContext } from "./menubar-menu.svelte";

	export type MenubarTriggerProps = WithElementRef<HTMLButtonAttributes>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: MenubarTriggerProps = $props();

	const { setValue, closeAll } = getMenubarContext();
	const { value, isOpen, triggerId, contentId } = getMenubarMenuContext();

	function handleClick() {
		setValue(isOpen ? "" : value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		} else if (event.key === "ArrowDown" && isOpen) {
			event.preventDefault();
			// Focus first menu item
			const content = document.getElementById(contentId);
			const firstItem = content?.querySelector('[role="menuitem"]') as HTMLElement;
			firstItem?.focus();
		} else if (event.key === "Escape") {
			event.preventDefault();
			closeAll();
		}
	}

	function handleMouseEnter() {
		if (!isOpen) {
			setValue(value);
		}
	}
</script>

<button
	bind:this={ref}
	id={triggerId}
	type="button"
	role="menuitem"
	class={cn("btn btn-ghost btn-sm", isOpen && "btn-active", className)}
	aria-expanded={isOpen}
	aria-haspopup="menu"
	aria-controls={contentId}
	onclick={handleClick}
	onkeydown={handleKeydown}
	onmouseenter={handleMouseEnter}
	{...restProps}
>
	{@render children?.()}
</button>