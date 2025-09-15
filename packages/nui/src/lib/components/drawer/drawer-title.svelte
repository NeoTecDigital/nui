<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DrawerTitleProps = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DrawerTitleProps = $props();

	const drawer = getContext("drawer");

	if (!drawer) {
		throw new Error("DrawerTitle must be used within a Drawer component");
	}
</script>

<h1
	bind:this={ref}
	data-slot="drawer-title"
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	id={drawer.titleId}
	{...restProps}
>
	{@render children?.()}
</h1>