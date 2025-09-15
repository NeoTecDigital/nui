<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CommandListProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: CommandListProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="command-list"
	class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
	role="listbox"
	{...restProps}
>
	{@render children?.()}
</div>