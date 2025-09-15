<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type BreadcrumbEllipsisProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: BreadcrumbEllipsisProps = $props();
</script>

<span
	bind:this={ref}
	role="presentation"
	aria-hidden="true"
	class={cn("flex h-9 w-9 items-center justify-center", className)}
	{...restProps}
>
	<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<circle cx="12" cy="12" r="1" />
		<circle cx="19" cy="12" r="1" />
		<circle cx="5" cy="12" r="1" />
	</svg>
	<span class="sr-only">More</span>
</span>