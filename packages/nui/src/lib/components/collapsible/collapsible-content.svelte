<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CollapsibleContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		forceMount?: boolean;
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		forceMount = false,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: CollapsibleContentProps = $props();

	const collapsibleContext = getContext("collapsible") as {
		isOpen: Writable<boolean>;
		toggle: () => void;
		disabled: boolean;
	};

	const shouldRender = $derived(forceMount || $collapsibleContext.isOpen);
</script>

{#if shouldRender}
	{#if asChild}
		{@render children?.()}
	{:else}
		<div
			bind:this={ref}
			class={cn(
				"collapse-content overflow-hidden text-sm",
				"data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
				className
			)}
			id="collapsible-content"
			role="region"
			aria-labelledby="collapsible-trigger"
			data-state={$collapsibleContext.isOpen ? "open" : "closed"}
			{...restProps}
		>
			<div class="pb-4 pt-0">
				{@render children?.()}
			</div>
		</div>
	{/if}
{/if}