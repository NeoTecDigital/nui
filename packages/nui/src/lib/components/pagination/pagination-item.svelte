<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type PaginationItemProps = WithElementRef<HTMLAttributes<HTMLLIElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationItemProps = $props();
</script>

<li
	bind:this={ref}
	data-slot="pagination-item"
	class={cn("", className)}
	{...restProps}
>
	{@render children?.()}
</li>