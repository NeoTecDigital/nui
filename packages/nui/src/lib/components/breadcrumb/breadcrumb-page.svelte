<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type BreadcrumbPageProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;

	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbPageProps = $props();
</script>

<span
	bind:this={ref}
	role="link"
	aria-disabled="true"
	aria-current="page"
	class={cn("text-base-content font-medium", className)}
	{...restProps}
>
	{@render children?.()}
</span>