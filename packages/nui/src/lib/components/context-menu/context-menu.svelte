<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext, setContext } from "svelte";

	export type ContextMenuProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

	interface ContextMenuContext {
		open: boolean;
		position: { x: number; y: number };
		show: (x: number, y: number) => void;
		close: () => void;
		contentId: string;
		triggerId: string;
	}

	const CONTEXT_MENU_KEY = "context-menu";
</script>

<script lang="ts">
	let {
		class: className,
		open = $bindable(false),
		onOpenChange,
		ref = $bindable(null),
		children,
		...restProps
	}: ContextMenuProps = $props();

	const contentId = generateId("context-content");
	const triggerId = generateId("context-trigger");
	let position = $state({ x: 0, y: 0 });

	function show(x: number, y: number) {
		position = { x, y };
		open = true;
		onOpenChange?.(open);
	}

	function close() {
		if (open) {
			open = false;
			onOpenChange?.(open);
		}
	}

	const context: ContextMenuContext = {
		get open() { return open; },
		get position() { return position; },
		show,
		close,
		contentId,
		triggerId,
	};

	setContext(CONTEXT_MENU_KEY, context);

	function handleClickOutside(event: MouseEvent) {
		if (open && ref && !ref.contains(event.target as Node)) {
			close();
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === "Escape" && open) {
			close();
		}
	}

	$effect(() => {
		if (typeof window !== "undefined") {
			document.addEventListener("click", handleClickOutside);
			document.addEventListener("keydown", handleEscape);
			return () => {
				document.removeEventListener("click", handleClickOutside);
				document.removeEventListener("keydown", handleEscape);
			};
		}
	});
</script>

<div
	bind:this={ref}
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	export function getContextMenuContext(): ContextMenuContext {
		const context = getContext<ContextMenuContext>(CONTEXT_MENU_KEY);
		if (!context) {
			throw new Error("ContextMenu components must be used within a ContextMenu");
		}
		return context;
	}
</script>