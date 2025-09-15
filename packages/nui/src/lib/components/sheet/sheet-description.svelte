<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type SheetDescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: SheetDescriptionProps = $props();

	const sheet = getContext("sheet");

	if (!sheet) {
		throw new Error("SheetDescription must be used within a Sheet component");
	}
</script>

<p
	bind:this={ref}
	data-slot="sheet-description"
	class={cn("text-sm text-base-content/70", className)}
	id={sheet.descriptionId}
	{...restProps}
>
	{@render children?.()}
</p>