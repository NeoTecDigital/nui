<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type TabsProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value?: string;
		defaultValue?: string;
		orientation?: "horizontal" | "vertical";
		dir?: "ltr" | "rtl";
		activationMode?: "automatic" | "manual";
	};
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	let {
		class: className,
		value = $bindable(),
		defaultValue,
		orientation = "horizontal",
		dir = "ltr",
		activationMode = "automatic",
		ref = $bindable(null),
		children,
		...restProps
	}: TabsProps = $props();

	const dispatch = createEventDispatcher<{
		valueChange: string;
	}>();

	// Initialize value if not provided
	if (value === undefined && defaultValue !== undefined) {
		value = defaultValue;
	}

	const activeValue = writable(value);

	$effect(() => {
		activeValue.set(value);
	});

	function setActiveValue(newValue: string) {
		activeValue.set(newValue);
		value = newValue;
		dispatch("valueChange", newValue);
	}

	// Context for child components
	setContext("tabs", {
		activeValue,
		setActiveValue,
		orientation,
		dir,
		activationMode
	});
</script>

<div
	bind:this={ref}
	class={cn("tabs", orientation === "vertical" && "tabs-vertical", className)}
	role="tablist"
	aria-orientation={orientation}
	dir={dir}
	{...restProps}
>
	{@render children?.()}
</div>