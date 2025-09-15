<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import { getContext, setContext } from "svelte";

	export const menubarVariants = tv({
		base: "menu menu-horizontal bg-base-200 rounded-box p-1",
		variants: {
			size: {
				sm: "min-h-8",
				default: "min-h-12",
				lg: "min-h-16",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type MenubarProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof menubarVariants> & {
			value?: string;
			onValueChange?: (value: string) => void;
		};

	interface MenubarContext {
		value: string | undefined;
		setValue: (value: string) => void;
		closeAll: () => void;
	}

	const MENUBAR_KEY = "menubar";
</script>

<script lang="ts">
	let {
		class: className,
		size = "default",
		value = $bindable(undefined),
		onValueChange,
		ref = $bindable(null),
		children,
		...restProps
	}: MenubarProps = $props();

	function setValue(newValue: string) {
		if (value !== newValue) {
			value = newValue;
			onValueChange?.(newValue);
		}
	}

	function closeAll() {
		value = undefined;
		onValueChange?.(undefined);
	}

	const context: MenubarContext = {
		get value() { return value; },
		setValue,
		closeAll,
	};

	setContext(MENUBAR_KEY, context);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			closeAll();
		} else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
			event.preventDefault();
			navigateMenus(event.key === "ArrowRight" ? 1 : -1);
		}
	}

	function navigateMenus(direction: 1 | -1) {
		if (!ref) return;
		
		const triggers = Array.from(ref.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
		const currentIndex = triggers.findIndex(trigger => trigger.getAttribute('aria-expanded') === 'true');
		
		let nextIndex;
		if (currentIndex === -1) {
			nextIndex = direction === 1 ? 0 : triggers.length - 1;
		} else {
			nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
		}
		
		const nextTrigger = triggers[nextIndex];
		if (nextTrigger) {
			nextTrigger.focus();
			nextTrigger.click();
		}
	}
</script>

<div
	bind:this={ref}
	role="menubar"
	class={cn(menubarVariants({ size }), className)}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	export function getMenubarContext(): MenubarContext {
		const context = getContext<MenubarContext>(MENUBAR_KEY);
		if (!context) {
			throw new Error("Menubar components must be used within a Menubar");
		}
		return context;
	}
</script>