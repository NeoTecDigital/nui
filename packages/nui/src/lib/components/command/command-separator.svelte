<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CommandSeparatorProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: CommandSeparatorProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="command-separator"
	class={cn("-mx-1 h-px bg-base-300", className)}
	role="separator"
	{...restProps}
></div>