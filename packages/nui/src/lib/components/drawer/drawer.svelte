<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	export type DrawerSide = "left" | "right";

	export type DrawerProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		side?: DrawerSide;
		modal?: boolean; // Whether drawer should be modal (with overlay) or not
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
		side = "left",
		modal = true,
		children,
		...restProps
	}: DrawerProps = $props();

	// Context for drawer state management
	interface DrawerContext {
		open: Writable<boolean>;
		openDrawer: () => void;
		closeDrawer: () => void;
		toggleDrawer: () => void;
		side: DrawerSide;
		modal: boolean;
		drawerId: string;
		titleId: string;
		descriptionId: string;
	}

	const drawerId = generateId("drawer");
	const titleId = generateId("drawer-title");
	const descriptionId = generateId("drawer-description");

	const openStore = writable(open);
	
	// Sync bindable prop with store
	$effect(() => {
		openStore.set(open);
	});

	$effect(() => {
		open = $openStore;
		onOpenChange?.(open);
	});

	const context: DrawerContext = {
		open: openStore,
		openDrawer: () => {
			openStore.set(true);
		},
		closeDrawer: () => {
			openStore.set(false);
		},
		toggleDrawer: () => {
			openStore.update(current => !current);
		},
		side,
		modal,
		drawerId,
		titleId,
		descriptionId
	};

	setContext("drawer", context);

	// Handle escape key globally when drawer is open (only in modal mode)
	$effect(() => {
		if ($openStore && modal) {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					context.closeDrawer();
				}
			};

			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="drawer-root"
	class={cn("drawer", side === "right" ? "drawer-end" : "", className)}
	{...restProps}
>
	{@render children?.()}
</div>