<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		src,
		alt = "",
		...restProps
	}: WithElementRef<HTMLImgAttributes> = $props();
</script>

<img
	bind:this={ref}
	data-slot="avatar-image"
	class={cn("rounded-full w-full h-full object-cover", className)}
	{src}
	{alt}
	{...restProps}
/>