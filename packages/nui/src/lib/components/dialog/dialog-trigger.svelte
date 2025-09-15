<script lang="ts" module>
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DialogTriggerProps = WithElementRef<HTMLButtonAttributes> & {
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
	}: DialogTriggerProps = $props();

	const dialog = getContext("dialog");

	if (!dialog) {
		throw new Error("DialogTrigger must be used within a Dialog component");
	}

	function handleClick(e: MouseEvent) {
		dialog.openDialog();
		onclick?.(e);
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		data-slot="dialog-trigger"
		class={cn("btn", className)}
		onclick={handleClick}
		aria-haspopup="dialog"
		aria-expanded={$dialog.open}
		aria-controls={dialog.dialogId}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}