<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TableCaptionProps = WithElementRef<HTMLAttributes<HTMLTableCaptionElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: TableCaptionProps = $props();
</script>

<caption
	bind:this={ref}
	data-slot="table-caption"
	class={cn("mt-4 text-sm text-base-content/70", className)}
	{...restProps}
>
	{@render children?.()}
</caption>