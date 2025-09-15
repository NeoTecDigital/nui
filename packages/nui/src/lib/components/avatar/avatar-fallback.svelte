<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="avatar-fallback"
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full bg-base-300 text-base-content text-sm font-medium",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>