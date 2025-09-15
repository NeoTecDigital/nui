<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CommandEmptyProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: CommandEmptyProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="command-empty"
	class={cn("py-6 text-center text-sm text-base-content/50", className)}
	{...restProps}
>
	{@render children?.()}
</div>