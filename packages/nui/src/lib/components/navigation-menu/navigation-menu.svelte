<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import { getContext, setContext } from "svelte";

	export const navigationMenuVariants = tv({
		base: "navbar bg-base-100",
		variants: {
			orientation: {
				horizontal: "flex-row",
				vertical: "flex-col",
			},
			size: {
				sm: "min-h-12",
				default: "min-h-16",
				lg: "min-h-20",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
			size: "default",
		},
	});

	export type NavigationMenuProps = WithElementRef<HTMLAttributes<HTMLElement>> & 
		VariantProps<typeof navigationMenuVariants> & {
			value?: string;
			onValueChange?: (value: string) => void;
		};

	interface NavigationContext {
		value: string | undefined;
		setValue: (value: string) => void;
		orientation: "horizontal" | "vertical";
	}

	const NAVIGATION_MENU_KEY = "navigation-menu";
</script>

<script lang="ts">
	let {
		class: className,
		orientation = "horizontal",
		size = "default",
		value = $bindable(undefined),
		onValueChange,
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuProps = $props();

	function setValue(newValue: string) {
		if (value !== newValue) {
			value = newValue;
			onValueChange?.(newValue);
		}
	}

	const context: NavigationContext = {
		get value() { return value; },
		setValue,
		orientation: orientation ?? "horizontal",
	};

	setContext(NAVIGATION_MENU_KEY, context);
</script>

<nav
	bind:this={ref}
	role="navigation"
	aria-label="Main navigation"
	class={cn(navigationMenuVariants({ orientation, size }), className)}
	{...restProps}
>
	{@render children?.()}
</nav>

<script lang="ts">
	export function getNavigationContext(): NavigationContext {
		const context = getContext<NavigationContext>(NAVIGATION_MENU_KEY);
		if (!context) {
			throw new Error("NavigationMenu components must be used within a NavigationMenu");
		}
		return context;
	}
</script>