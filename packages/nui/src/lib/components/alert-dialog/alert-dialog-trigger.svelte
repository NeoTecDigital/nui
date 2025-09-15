<script lang="ts" module>
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogTriggerProps = WithElementRef<HTMLButtonAttributes> & {
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
	}: AlertDialogTriggerProps = $props();

	const alertDialog = getContext("alert-dialog");

	if (!alertDialog) {
		throw new Error("AlertDialogTrigger must be used within an AlertDialog component");
	}

	function handleClick(e: MouseEvent) {
		alertDialog.openDialog();
		onclick?.(e);
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		data-slot="alert-dialog-trigger"
		class={cn("btn", className)}
		onclick={handleClick}
		aria-haspopup="dialog"
		aria-expanded={$alertDialog.open}
		aria-controls={alertDialog.dialogId}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}