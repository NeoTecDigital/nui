<script lang="ts" module>
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogCancelProps = WithElementRef<HTMLButtonAttributes> & {
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
	}: AlertDialogCancelProps = $props();

	const alertDialog = getContext("alert-dialog");

	if (!alertDialog) {
		throw new Error("AlertDialogCancel must be used within an AlertDialog component");
	}

	function handleClick(e: MouseEvent) {
		// Execute the provided onclick handler first
		onclick?.(e);
		
		// Then close the dialog (unless prevented by the handler)
		if (!e.defaultPrevented) {
			alertDialog.closeDialog();
		}
	}
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		data-slot="alert-dialog-cancel"
		class={cn("btn btn-outline", className)}
		onclick={handleClick}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}