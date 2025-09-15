<script lang="ts" module>
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type SheetTriggerProps = WithElementRef<HTMLButtonAttributes> & {
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		asChild = false,
		children,
		onclick,
		...restProps
	}: SheetTriggerProps = $props();

	const sheet = getContext("sheet");

	if (!sheet) {
		throw new Error("SheetTrigger must be used within a Sheet component");
	}

	function handleClick(e: MouseEvent) {
		sheet.openSheet();
		onclick?.(e);
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		data-slot="sheet-trigger"
		class={cn("btn", className)}
		onclick={handleClick}
		aria-haspopup="dialog"
		aria-expanded={$sheet.open}
		aria-controls={sheet.sheetId}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}