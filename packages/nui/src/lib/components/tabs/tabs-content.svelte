<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TabsContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value: string;
		forceMount?: boolean;
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		value,
		forceMount = false,
		asChild = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TabsContentProps = $props();

	const tabsContext = getContext("tabs") as {
		activeValue: Writable<string>;
		setActiveValue: (value: string) => void;
		orientation: "horizontal" | "vertical";
		dir: "ltr" | "rtl";
		activationMode: "automatic" | "manual";
	};

	const isActive = $derived($tabsContext.activeValue === value);
	const shouldRender = $derived(forceMount || isActive);
</script>

{#if shouldRender}
	{#if asChild}
		{@render children?.()}
	{:else}
		<div
			bind:this={ref}
			class={cn(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				!isActive && "hidden",
				className
			)}
			role="tabpanel"
			aria-labelledby={`tab-${value}`}
			id={`tabpanel-${value}`}
			tabindex={0}
			data-state={isActive ? "active" : "inactive"}
			{...restProps}
		>
			{@render children?.()}
		</div>
	{/if}
{/if}