<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type BreadcrumbItemProps = WithElementRef<HTMLAttributes<HTMLLIElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbItemProps = $props();
</script>

<li
	bind:this={ref}
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</li>