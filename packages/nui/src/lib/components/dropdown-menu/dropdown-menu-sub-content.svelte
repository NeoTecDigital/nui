<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getDropdownSubContext } from "./dropdown-menu-sub.svelte";

	export type DropdownMenuSubContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuSubContentProps = $props();

	const { open, close, contentId, triggerId } = getDropdownSubContext();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" || event.key === "ArrowLeft") {
			event.preventDefault();
			close();
			// Return focus to trigger
			document.getElementById(triggerId)?.focus();
		}
	}
</script>

{#if open}
	<div
		bind:this={ref}
		id={contentId}
		role="menu"
		aria-labelledby={triggerId}
		class={cn("dropdown-content menu bg-base-200 rounded-box z-[1] shadow-lg min-w-52 p-2", className)}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}