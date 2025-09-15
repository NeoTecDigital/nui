<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	export type SheetSide = "top" | "right" | "bottom" | "left";

	export type SheetProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		side?: SheetSide;
	};
</script>

<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	let {
		ref = $bindable(null),
		class: className,
		open = $bindable(false),
		onOpenChange,
		side = "right",
		children,
		...restProps
	}: SheetProps = $props();

	// Context for sheet state management
	interface SheetContext {
		open: Writable<boolean>;
		openSheet: () => void;
		closeSheet: () => void;
		side: SheetSide;
		sheetId: string;
		titleId: string;
		descriptionId: string;
	}

	const sheetId = generateId("sheet");
	const titleId = generateId("sheet-title");
	const descriptionId = generateId("sheet-description");

	const openStore = writable(open);
	
	// Sync bindable prop with store
	$effect(() => {
		openStore.set(open);
	});

	$effect(() => {
		open = $openStore;
		onOpenChange?.(open);
	});

	const context: SheetContext = {
		open: openStore,
		openSheet: () => {
			openStore.set(true);
		},
		closeSheet: () => {
			openStore.set(false);
		},
		side,
		sheetId,
		titleId,
		descriptionId
	};

	setContext("sheet", context);

	// Handle escape key globally when sheet is open
	$effect(() => {
		if ($openStore) {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					context.closeSheet();
				}
			};

			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="sheet-root"
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</div>