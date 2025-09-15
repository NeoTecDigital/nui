<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type SheetTitleProps = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: SheetTitleProps = $props();

	const sheet = getContext("sheet");

	if (!sheet) {
		throw new Error("SheetTitle must be used within a Sheet component");
	}
</script>

<h1
	bind:this={ref}
	data-slot="sheet-title"
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	id={sheet.titleId}
	{...restProps}
>
	{@render children?.()}
</h1>