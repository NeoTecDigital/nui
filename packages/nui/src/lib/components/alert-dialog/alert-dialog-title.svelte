<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogTitleProps = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertDialogTitleProps = $props();

	const alertDialog = getContext("alert-dialog");

	if (!alertDialog) {
		throw new Error("AlertDialogTitle must be used within an AlertDialog component");
	}
</script>

<h1
	bind:this={ref}
	data-slot="alert-dialog-title"
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	id={alertDialog.titleId}
	{...restProps}
>
	{@render children?.()}
</h1>