<script lang="ts" module>
	import { cn, type WithElementRef, trapFocus } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	import { getContextMenuContext } from "./context-menu.svelte";

	export const contextContentVariants = tv({
		base: "menu bg-base-200 rounded-box shadow-lg min-w-52 fixed z-50",
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

	export type ContextMenuContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof contextContentVariants>;

	let {
		class: className,
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: ContextMenuContentProps = $props();

	const { open, close, position, contentId, triggerId } = getContextMenuContext();

	let focusTrap: (() => void) | null = null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
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

	function positionMenu() {
		if (!ref || !open) return;

		const rect = ref.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		let x = position.x;
		let y = position.y;

		// Adjust position to keep menu in viewport
		if (x + rect.width > viewportWidth) {
			x = viewportWidth - rect.width - 8;
		}
		if (y + rect.height > viewportHeight) {
			y = viewportHeight - rect.height - 8;
		}
		if (x < 8) x = 8;
		if (y < 8) y = 8;

		ref.style.left = `${x}px`;
		ref.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && ref) {
			focusTrap = trapFocus(ref);
			positionMenu();
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

{#if open}
	<div
		bind:this={ref}
		id={contentId}
		role="menu"
		aria-labelledby={triggerId}
		class={cn(contextContentVariants({ size }), className)}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}