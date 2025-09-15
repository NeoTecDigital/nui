<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type DialogTitleProps = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DialogTitleProps = $props();

	const dialog = getContext("dialog");

	if (!dialog) {
		throw new Error("DialogTitle must be used within a Dialog component");
	}
</script>

<h1
	bind:this={ref}
	data-slot="dialog-title"
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	id={dialog.titleId}
	{...restProps}
>
	{@render children?.()}
</h1>