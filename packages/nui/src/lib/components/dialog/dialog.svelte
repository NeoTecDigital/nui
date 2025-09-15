<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	export type DialogProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
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
		children,
		...restProps
	}: DialogProps = $props();

	// Context for dialog state management
	interface DialogContext {
		open: Writable<boolean>;
		openDialog: () => void;
		closeDialog: () => void;
		dialogId: string;
		titleId: string;
		descriptionId: string;
	}

	const dialogId = generateId("dialog");
	const titleId = generateId("dialog-title");
	const descriptionId = generateId("dialog-description");

	const openStore = writable(open);
	
	// Sync bindable prop with store
	$effect(() => {
		openStore.set(open);
	});

	$effect(() => {
		open = $openStore;
		onOpenChange?.(open);
	});

	const context: DialogContext = {
		open: openStore,
		openDialog: () => {
			openStore.set(true);
		},
		closeDialog: () => {
			openStore.set(false);
		},
		dialogId,
		titleId,
		descriptionId
	};

	setContext("dialog", context);

	// Handle escape key globally when dialog is open
	$effect(() => {
		if ($openStore) {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					context.closeDialog();
				}
			};

			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="dialog-root"
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</div>