<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import { getContext, setContext } from "svelte";

	export const dropdownVariants = tv({
		base: "dropdown",
		variants: {
			position: {
				top: "dropdown-top",
				bottom: "dropdown-bottom",
				left: "dropdown-left",
				right: "dropdown-right",
				end: "dropdown-end",
			},
			hover: {
				true: "dropdown-hover",
			},
		},
		defaultVariants: {
			position: "bottom",
		},
	});

	export type DropdownVariant = VariantProps<typeof dropdownVariants>["position"];

	export type DropdownMenuProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		position?: DropdownVariant;
		hover?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

	interface DropdownContext {
		open: boolean;
		toggle: () => void;
		close: () => void;
		contentId: string;
		triggerId: string;
	}

	const DROPDOWN_MENU_KEY = "dropdown-menu";
</script>

<script lang="ts">
	let {
		class: className,
		open = $bindable(false),
		position = "bottom",
		hover = false,
		onOpenChange,
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuProps = $props();

	const contentId = generateId("dropdown-content");
	const triggerId = generateId("dropdown-trigger");

	function toggle() {
		open = !open;
		onOpenChange?.(open);
	}

	function close() {
		if (open) {
			open = false;
			onOpenChange?.(open);
		}
	}

	const context: DropdownContext = {
		get open() { return open; },
		toggle,
		close,
		contentId,
		triggerId,
	};

	setContext(DROPDOWN_MENU_KEY, context);

	function handleClickOutside(event: MouseEvent) {
		if (open && ref && !ref.contains(event.target as Node)) {
			close();
		}
	}

	$effect(() => {
		if (typeof window !== "undefined") {
			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		}
	});
</script>

<div
	bind:this={ref}
	class={cn(dropdownVariants({ position, hover }), open && "dropdown-open", className)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	export function getDropdownContext(): DropdownContext {
		const context = getContext<DropdownContext>(DROPDOWN_MENU_KEY);
		if (!context) {
			throw new Error("DropdownMenu components must be used within a DropdownMenu");
		}
		return context;
	}
</script>