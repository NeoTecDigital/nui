<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type BreadcrumbListProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbListProps = $props();
</script>

<ul
	bind:this={ref}
	class={cn("text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</ul>