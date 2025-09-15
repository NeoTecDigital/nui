<script lang="ts" module>
	import { cn, type WithElementRef, trapFocus } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	import { getMenubarContext } from "./menubar.svelte";
	import { getMenubarMenuContext } from "./menubar-menu.svelte";

	export const menubarContentVariants = tv({
		base: "dropdown-content menu bg-base-100 rounded-box z-[1] shadow-lg min-w-52",
		variants: {
			size: {
				sm: "p-1 text-sm",
				default: "p-2",
				lg: "p-3 text-lg",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type MenubarContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof menubarContentVariants>;

	let {
		class: className,
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: MenubarContentProps = $props();

	const { closeAll } = getMenubarContext();
	const { isOpen, contentId, triggerId } = getMenubarMenuContext();

	let focusTrap: (() => void) | null = null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			closeAll();
			document.getElementById(triggerId)?.focus();
		} else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			navigateItems(event.key === "ArrowDown" ? 1 : -1);
		}
	}

	function navigateItems(direction: 1 | -1) {
		if (!ref) return;
		
		const items = Array.from(ref.querySelectorAll('[role="menuitem"]:not([disabled])')) as HTMLElement[];
		const currentIndex = items.findIndex(item => item === document.activeElement);
		
		let nextIndex;
		if (currentIndex === -1) {
			nextIndex = direction === 1 ? 0 : items.length - 1;
		} else {
			nextIndex = (currentIndex + direction + items.length) % items.length;
		}
		
		items[nextIndex]?.focus();
	}

	$effect(() => {
		if (isOpen && ref) {
			focusTrap = trapFocus(ref);
			// Focus first item
			const firstItem = ref.querySelector('[role="menuitem"]:not([disabled])') as HTMLElement;
			firstItem?.focus();
		} else if (focusTrap) {
			focusTrap();
			focusTrap = null;
		}

		return () => {
			if (focusTrap) {
				focusTrap();
			}
		};
	});
</script>

{#if isOpen}
	<div
		bind:this={ref}
		id={contentId}
		role="menu"
		aria-labelledby={triggerId}
		class={cn(menubarContentVariants({ size }), className)}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}