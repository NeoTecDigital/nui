<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertDialogHeaderProps = $props();
</script>

<header
	bind:this={ref}
	data-slot="alert-dialog-header"
	class={cn("flex flex-col space-y-2 text-center sm:text-left mb-4", className)}
	{...restProps}
>
	{@render children?.()}
</header>