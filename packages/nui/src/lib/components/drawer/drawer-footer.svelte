<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DrawerFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DrawerFooterProps = $props();
</script>

<footer
	bind:this={ref}
	data-slot="drawer-footer"
	class={cn("flex flex-col space-y-2 mt-auto pt-6", className)}
	{...restProps}
>
	{@render children?.()}
</footer>