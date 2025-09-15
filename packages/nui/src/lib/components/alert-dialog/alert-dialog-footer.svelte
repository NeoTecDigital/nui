<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertDialogFooterProps = $props();
</script>

<footer
	bind:this={ref}
	data-slot="alert-dialog-footer"
	class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
	{...restProps}
>
	{@render children?.()}
</footer>