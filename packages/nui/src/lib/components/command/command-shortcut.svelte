<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CommandShortcutProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: CommandShortcutProps = $props();
</script>

<span
	bind:this={ref}
	data-slot="command-shortcut"
	class={cn("ml-auto text-xs tracking-widest text-base-content/50", className)}
	{...restProps}
>
	{@render children?.()}
</span>