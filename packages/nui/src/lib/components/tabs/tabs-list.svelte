<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type TabsListProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		loop?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, setContext } from "svelte";
	import type { Writable } from "svelte/store";

	let {
		class: className,
		loop = true,
		ref = $bindable(null),
		children,
		...restProps
	}: TabsListProps = $props();

	const tabsContext = getContext("tabs") as {
		activeValue: Writable<string>;
		setActiveValue: (value: string) => void;
		orientation: "horizontal" | "vertical";
		dir: "ltr" | "rtl";
		activationMode: "automatic" | "manual";
	};

	const tabElements: HTMLElement[] = [];

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const currentIndex = tabElements.indexOf(target);
		
		if (currentIndex === -1) return;

		let nextIndex = currentIndex;
		const isHorizontal = tabsContext.orientation === "horizontal";
		const isRtl = tabsContext.dir === "rtl";

		switch (event.key) {
			case "ArrowLeft":
				if (isHorizontal) {
					nextIndex = isRtl ? currentIndex + 1 : currentIndex - 1;
				}
				break;
			case "ArrowRight":
				if (isHorizontal) {
					nextIndex = isRtl ? currentIndex - 1 : currentIndex + 1;
				}
				break;
			case "ArrowUp":
				if (!isHorizontal) {
					nextIndex = currentIndex - 1;
				}
				break;
			case "ArrowDown":
				if (!isHorizontal) {
					nextIndex = currentIndex + 1;
				}
				break;
			case "Home":
				nextIndex = 0;
				break;
			case "End":
				nextIndex = tabElements.length - 1;
				break;
			default:
				return;
		}

		event.preventDefault();

		// Handle wrapping
		if (loop) {
			if (nextIndex < 0) nextIndex = tabElements.length - 1;
			if (nextIndex >= tabElements.length) nextIndex = 0;
		} else {
			nextIndex = Math.max(0, Math.min(nextIndex, tabElements.length - 1));
		}

		const nextTab = tabElements[nextIndex];
		if (nextTab) {
			nextTab.focus();
			if (tabsContext.activationMode === "automatic") {
				const value = nextTab.getAttribute("data-value");
				if (value) {
					tabsContext.setActiveValue(value);
				}
			}
		}
	}

	// Context for tab triggers
	setContext("tabsList", {
		registerTab: (element: HTMLElement) => {
			tabElements.push(element);
			return () => {
				const index = tabElements.indexOf(element);
				if (index > -1) {
					tabElements.splice(index, 1);
				}
			};
		}
	});
</script>

<div
	bind:this={ref}
	class={cn(
		"tab-content inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
		tabsContext.orientation === "vertical" && "flex-col h-full",
		className
	)}
	role="tablist"
	aria-orientation={tabsContext.orientation}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</div>