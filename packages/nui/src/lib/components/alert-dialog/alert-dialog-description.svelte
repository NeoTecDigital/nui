<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogDescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertDialogDescriptionProps = $props();

	const alertDialog = getContext("alert-dialog");

	if (!alertDialog) {
		throw new Error("AlertDialogDescription must be used within an AlertDialog component");
	}
</script>

<p
	bind:this={ref}
	data-slot="alert-dialog-description"
	class={cn("text-sm text-base-content/70", className)}
	id={alertDialog.descriptionId}
	{...restProps}
>
	{@render children?.()}
</p>