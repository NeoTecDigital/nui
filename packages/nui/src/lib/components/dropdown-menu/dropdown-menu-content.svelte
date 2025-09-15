<script lang="ts" module>
	import { cn, type WithElementRef, trapFocus } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	import { getDropdownContext } from "./dropdown-menu.svelte";

	export const dropdownContentVariants = tv({
		base: "dropdown-content menu bg-base-200 rounded-box z-[1] shadow-lg min-w-52",
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

	export type DropdownMenuContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & 
		VariantProps<typeof dropdownContentVariants>;

	let {
		class: className,
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuContentProps = $props();

	const { open, close, contentId, triggerId } = getDropdownContext();

	let focusTrap: (() => void) | null = null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
			// Return focus to trigger
			document.getElementById(triggerId)?.focus();
		} else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			navigateItems(event.key === "ArrowDown" ? 1 : -1);
		} else if (event.key === "Home") {
			event.preventDefault();
			focusFirstItem();
		} else if (event.key === "End") {
			event.preventDefault();
			focusLastItem();
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

	function focusFirstItem() {
		if (!ref) return;
		const firstItem = ref.querySelector('[role="menuitem"]:not([disabled])') as HTMLElement;
		firstItem?.focus();
	}

	function focusLastItem() {
		if (!ref) return;
		const items = ref.querySelectorAll('[role="menuitem"]:not([disabled])');
		const lastItem = items[items.length - 1] as HTMLElement;
		lastItem?.focus();
	}

	$effect(() => {
		if (open && ref) {
			// Setup focus trap
			focusTrap = trapFocus(ref);
			// Focus first item
			focusFirstItem();
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
		class={cn(dropdownContentVariants({ size }), className)}
		onkeydown={handleKeydown}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}