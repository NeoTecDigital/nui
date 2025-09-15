<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext, setContext } from "svelte";
</script>

<script lang="ts">
	import { getNavigationContext } from "./navigation-menu.svelte";

	export type NavigationMenuItemProps = WithElementRef<HTMLAttributes<HTMLLIElement>> & {
		value?: string;
	};

	interface NavigationItemContext {
		value?: string;
		triggerId: string;
		contentId: string;
		isActive: boolean;
	}

	const NAVIGATION_ITEM_KEY = "navigation-item";

	let {
		class: className,
		value,
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuItemProps = $props();

	const { value: activeValue, setValue } = getNavigationContext();
	const triggerId = generateId("nav-trigger");
	const contentId = generateId("nav-content");

	$: isActive = value !== undefined && activeValue === value;

	const context: NavigationItemContext = {
		value,
		triggerId,
		contentId,
		get isActive() { return isActive; },
	};

	setContext(NAVIGATION_ITEM_KEY, context);
</script>

<li
	bind:this={ref}
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</li>

<script lang="ts">
	export function getNavigationItemContext(): NavigationItemContext {
		const context = getContext<NavigationItemContext>(NAVIGATION_ITEM_KEY);
		if (!context) {
			throw new Error("NavigationMenuItem components must be used within a NavigationMenuItem");
		}
		return context;
	}
</script>