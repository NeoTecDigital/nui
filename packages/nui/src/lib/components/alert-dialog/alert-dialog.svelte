<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
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
	}: AlertDialogProps = $props();

	// Context for alert dialog state management
	interface AlertDialogContext {
		open: Writable<boolean>;
		openDialog: () => void;
		closeDialog: () => void;
		dialogId: string;
		titleId: string;
		descriptionId: string;
	}

	const dialogId = generateId("alert-dialog");
	const titleId = generateId("alert-dialog-title");
	const descriptionId = generateId("alert-dialog-description");

	const openStore = writable(open);
	
	// Sync bindable prop with store
	$effect(() => {
		openStore.set(open);
	});

	$effect(() => {
		open = $openStore;
		onOpenChange?.(open);
	});

	const context: AlertDialogContext = {
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

	setContext("alert-dialog", context);

	// Handle escape key globally when dialog is open (can be disabled for confirmation dialogs)
	$effect(() => {
		if ($openStore) {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					// For alert dialogs, you might want to prevent escape by default
					// This can be overridden at the content level
				}
			};

			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="alert-dialog-root"
	class={cn(className)}
	{...restProps}
>
	{@render children?.()}
</div>