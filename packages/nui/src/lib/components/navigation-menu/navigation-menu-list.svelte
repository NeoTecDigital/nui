<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	import { getNavigationContext } from "./navigation-menu.svelte";

	export type NavigationMenuListProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuListProps = $props();

	const { orientation } = getNavigationContext();
</script>

<ul
	bind:this={ref}
	class={cn(
		"menu",
		orientation === "horizontal" ? "menu-horizontal" : "menu-vertical",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ul>