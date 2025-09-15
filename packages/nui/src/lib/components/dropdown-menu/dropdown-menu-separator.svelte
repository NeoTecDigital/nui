<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
</script>

<script lang="ts">
	export type DropdownMenuSeparatorProps = WithElementRef<HTMLAttributes<HTMLHRElement>>;

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: DropdownMenuSeparatorProps = $props();
</script>

<hr
	bind:this={ref}
	role="separator"
	class={cn("divider my-1", className)}
	{...restProps}
/>