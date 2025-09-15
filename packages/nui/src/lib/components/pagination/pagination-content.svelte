<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type PaginationContentProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationContentProps = $props();
</script>

<ul
	bind:this={ref}
	data-slot="pagination-content"
	class={cn("flex flex-row items-center gap-1", className)}
	{...restProps}
>
	{@render children?.()}
</ul>