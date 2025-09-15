<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type ContextMenuLabelProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: ContextMenuLabelProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("menu-title text-sm font-semibold", className)}
	{...restProps}
>
	{@render children?.()}
</div>