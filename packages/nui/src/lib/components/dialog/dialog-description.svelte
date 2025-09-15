<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DialogDescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DialogDescriptionProps = $props();

	const dialog = getContext("dialog");

	if (!dialog) {
		throw new Error("DialogDescription must be used within a Dialog component");
	}
</script>

<p
	bind:this={ref}
	data-slot="dialog-description"
	class={cn("text-sm text-base-content/70", className)}
	id={dialog.descriptionId}
	{...restProps}
>
	{@render children?.()}
</p>