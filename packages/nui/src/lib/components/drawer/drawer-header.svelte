<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DrawerHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DrawerHeaderProps = $props();
</script>

<header
	bind:this={ref}
	data-slot="drawer-header"
	class={cn("flex flex-col space-y-2 mb-6", className)}
	{...restProps}
>
	{@render children?.()}
</header>