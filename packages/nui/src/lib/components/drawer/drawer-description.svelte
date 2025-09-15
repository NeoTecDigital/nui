<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DrawerDescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DrawerDescriptionProps = $props();

	const drawer = getContext("drawer");

	if (!drawer) {
		throw new Error("DrawerDescription must be used within a Drawer component");
	}
</script>

<p
	bind:this={ref}
	data-slot="drawer-description"
	class={cn("text-sm text-base-content/70", className)}
	id={drawer.descriptionId}
	{...restProps}
>
	{@render children?.()}
</p>