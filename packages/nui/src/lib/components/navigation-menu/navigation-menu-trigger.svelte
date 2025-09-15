<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getNavigationContext } from "./navigation-menu.svelte";
	import { getNavigationItemContext } from "./navigation-menu-item.svelte";

	export type NavigationMenuTriggerProps = WithElementRef<HTMLButtonAttributes>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuTriggerProps = $props();

	const { setValue } = getNavigationContext();
	const { value, triggerId, contentId, isActive } = getNavigationItemContext();

	function handleClick() {
		if (value) {
			setValue(isActive ? "" : value);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		} else if (event.key === "ArrowDown" && isActive) {
			event.preventDefault();
			// Focus first item in content
			const content = document.getElementById(contentId);
			const firstFocusable = content?.querySelector('a, button, [tabindex]:not([tabindex="-1"])') as HTMLElement;
			firstFocusable?.focus();
		}
	}
</script>

<button
	bind:this={ref}
	id={triggerId}
	type="button"
	class={cn("btn btn-ghost", isActive && "btn-active", className)}
	aria-expanded={isActive}
	aria-controls={value ? contentId : undefined}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
	{#if value}
		<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	{/if}
</button>