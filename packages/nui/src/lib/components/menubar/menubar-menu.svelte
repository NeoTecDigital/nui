<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext, setContext } from "svelte";
</script>

<script lang="ts">
	import { getMenubarContext } from "./menubar.svelte";

	export type MenubarMenuProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value: string;
	};

	interface MenubarMenuContext {
		value: string;
		isOpen: boolean;
		triggerId: string;
		contentId: string;
	}

	const MENUBAR_MENU_KEY = "menubar-menu";

	let {
		class: className,
		value,
		ref = $bindable(null),
		children,
		...restProps
	}: MenubarMenuProps = $props();

	const { value: activeValue } = getMenubarContext();
	const triggerId = generateId("menubar-trigger");
	const contentId = generateId("menubar-content");

	$: isOpen = activeValue === value;

	const context: MenubarMenuContext = {
		value,
		get isOpen() { return isOpen; },
		triggerId,
		contentId,
	};

	setContext(MENUBAR_MENU_KEY, context);
</script>

<div
	bind:this={ref}
	class={cn("dropdown", isOpen && "dropdown-open", className)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	export function getMenubarMenuContext(): MenubarMenuContext {
		const context = getContext<MenubarMenuContext>(MENUBAR_MENU_KEY);
		if (!context) {
			throw new Error("MenubarMenu components must be used within a MenubarMenu");
		}
		return context;
	}
</script>