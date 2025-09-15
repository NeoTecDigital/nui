<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getContextMenuContext } from "./context-menu.svelte";

	export type ContextMenuTriggerProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: ContextMenuTriggerProps = $props();

	const { show, close, contentId, triggerId } = getContextMenuContext();

	function handleContextMenu(event: MouseEvent) {
		event.preventDefault();
		show(event.clientX, event.clientY);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Menu" || (event.key === "F10" && event.shiftKey)) {
			event.preventDefault();
			// Show context menu at bottom-left of element
			if (ref) {
				const rect = ref.getBoundingClientRect();
				show(rect.left, rect.bottom);
			}
		}
	}
</script>

<div
	bind:this={ref}
	id={triggerId}
	role="button"
	tabindex="0"
	aria-controls={contentId}
	class={cn(className)}
	oncontextmenu={handleContextMenu}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</div>