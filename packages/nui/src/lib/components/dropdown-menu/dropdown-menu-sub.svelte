<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext, setContext } from "svelte";

	export type DropdownMenuSubProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

	interface DropdownSubContext {
		open: boolean;
		toggle: () => void;
		close: () => void;
		contentId: string;
		triggerId: string;
	}

	const DROPDOWN_SUB_KEY = "dropdown-sub";
</script>

<script lang="ts">
	let {
		class: className,
		open = $bindable(false),
		onOpenChange,
		ref = $bindable(null),
		children,
		...restProps
	}: DropdownMenuSubProps = $props();

	const contentId = generateId("dropdown-sub-content");
	const triggerId = generateId("dropdown-sub-trigger");

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

	const context: DropdownSubContext = {
		get open() { return open; },
		toggle,
		close,
		contentId,
		triggerId,
	};

	setContext(DROPDOWN_SUB_KEY, context);
</script>

<div
	bind:this={ref}
	class={cn("dropdown dropdown-right", className)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	export function getDropdownSubContext(): DropdownSubContext {
		const context = getContext<DropdownSubContext>(DROPDOWN_SUB_KEY);
		if (!context) {
			throw new Error("DropdownMenuSub components must be used within a DropdownMenuSub");
		}
		return context;
	}
</script>