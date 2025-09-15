<script lang="ts" module>
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TooltipProviderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		delayDuration?: number;
		skipDelayDuration?: number;
		disableHoverableContent?: boolean;
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";

	let {
		delayDuration = 700,
		skipDelayDuration = 300,
		disableHoverableContent = false,
		children,
		...restProps
	}: TooltipProviderProps = $props();

	// Global tooltip provider context
	setContext("tooltipProvider", {
		delayDuration,
		skipDelayDuration,
		disableHoverableContent
	});
</script>

<div {...restProps}>
	{@render children?.()}
</div>