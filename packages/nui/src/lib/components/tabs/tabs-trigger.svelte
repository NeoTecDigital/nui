<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	export type TabsTriggerProps = WithElementRef<HTMLButtonAttributes> & {
		value: string;
		asChild?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		value,
		asChild = false,
		disabled = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TabsTriggerProps = $props();

	const tabsContext = getContext("tabs") as {
		activeValue: Writable<string>;
		setActiveValue: (value: string) => void;
		orientation: "horizontal" | "vertical";
		dir: "ltr" | "rtl";
		activationMode: "automatic" | "manual";
	};

	const tabsListContext = getContext("tabsList") as {
		registerTab: (element: HTMLElement) => () => void;
	};

	const isActive = $derived($tabsContext.activeValue === value);

	function handleClick() {
		if (!disabled) {
			tabsContext.setActiveValue(value);
		}
	}

	onMount(() => {
		if (ref && tabsListContext) {
			return tabsListContext.registerTab(ref);
		}
	});
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={ref}
		type="button"
		class={cn(
			"tab inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
			isActive && "tab-active bg-background text-foreground shadow",
			className
		)}
		role="tab"
		aria-selected={isActive}
		aria-controls={`tabpanel-${value}`}
		data-state={isActive ? "active" : "inactive"}
		data-value={value}
		tabindex={isActive ? 0 : -1}
		{disabled}
		onclick={handleClick}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}