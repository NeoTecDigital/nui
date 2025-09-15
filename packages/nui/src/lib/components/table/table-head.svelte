<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TableHeadProps = WithElementRef<HTMLAttributes<HTMLTableCellElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: TableHeadProps = $props();
</script>

<th
	bind:this={ref}
	data-slot="table-head"
	class={cn(
		"h-10 px-2 text-left align-middle font-medium text-base-content/70 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>