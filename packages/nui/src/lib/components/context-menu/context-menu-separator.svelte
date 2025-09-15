<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type ContextMenuSeparatorProps = WithElementRef<HTMLAttributes<HTMLHRElement>>;

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: ContextMenuSeparatorProps = $props();
</script>

<hr
	bind:this={ref}
	role="separator"
	class={cn("divider my-1", className)}
	{...restProps}
/>