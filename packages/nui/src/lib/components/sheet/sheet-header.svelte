<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	export type SheetHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: SheetHeaderProps = $props();
</script>

<header
	bind:this={ref}
	data-slot="sheet-header"
	class={cn("flex flex-col space-y-2 text-center sm:text-left mb-6", className)}
	{...restProps}
>
	{@render children?.()}
</header>