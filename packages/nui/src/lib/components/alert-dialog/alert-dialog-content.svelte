<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, trapFocus, type WithElementRef } from "$lib/utils.js";

	export type AlertDialogContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
	};
</script>

<script lang="ts">
	import { getContext, tick } from "svelte";
	import { portal } from "../../actions/portal.js";

	let {
		ref = $bindable(null),
		class: className,
		closeOnOutsideClick = false, // Alert dialogs typically don't close on outside click
		closeOnEscape = false, // Alert dialogs typically don't close on escape
		children,
		...restProps
	}: AlertDialogContentProps = $props();

	const alertDialog = getContext("alert-dialog");

	if (!alertDialog) {
		throw new Error("AlertDialogContent must be used within an AlertDialog component");
	}

	let contentRef: HTMLDivElement;
	let cleanupFocusTrap: (() => void) | null = null;

	// Handle focus trap when dialog opens
	$effect(() => {
		if ($alertDialog.open && contentRef) {
			tick().then(() => {
				cleanupFocusTrap = trapFocus(contentRef);
			});
		} else if (cleanupFocusTrap) {
			cleanupFocusTrap();
			cleanupFocusTrap = null;
		}

		return () => {
			if (cleanupFocusTrap) {
				cleanupFocusTrap();
			}
		};
	});

	function handleBackdropClick(e: MouseEvent) {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			alertDialog.closeDialog();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === "Escape") {
			alertDialog.closeDialog();
		}
	}
</script>

{#if $alertDialog.open}
	<div use:portal>
		<!-- DaisyUI Modal Structure for Alert Dialog -->
		<div
			class="modal modal-open"
			onclick={handleBackdropClick}
			onkeydown={handleKeydown}
			role="presentation"
		>
			<!-- Modal backdrop -->
			<div class="modal-backdrop"></div>
			
			<!-- Modal content -->
			<div
				bind:this={contentRef}
				bind:this={ref}
				data-slot="alert-dialog-content"
				class={cn("modal-box relative max-w-md", className)}
				role="alertdialog"
				aria-modal="true"
				aria-labelledby={alertDialog.titleId}
				aria-describedby={alertDialog.descriptionId}
				id={alertDialog.dialogId}
				tabindex="-1"
				{...restProps}
			>
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}