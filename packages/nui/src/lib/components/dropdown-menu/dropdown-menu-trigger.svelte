<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getDropdownContext } from "./dropdown-menu.svelte";

	export type DropdownMenuTriggerProps = WithElementRef<HTMLButtonAttributes>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuTriggerProps = $props();

	const { open, toggle, contentId, triggerId } = getDropdownContext();

	function handleClick() {
		toggle();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggle();
		} else if (event.key === "Escape" && open) {
			event.preventDefault();
			getDropdownContext().close();
		} else if (event.key === "ArrowDown" && open) {
			event.preventDefault();
			// Focus first menu item
			const content = document.getElementById(contentId);
			const firstItem = content?.querySelector('[role="menuitem"]') as HTMLElement;
			firstItem?.focus();
		}
	}
</script>

<button
	bind:this={ref}
	id={triggerId}
	type="button"
	class={cn("btn", className)}
	aria-expanded={open}
	aria-haspopup="menu"
	aria-controls={contentId}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</button>