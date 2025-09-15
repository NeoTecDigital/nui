<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, trapFocus, type WithElementRef } from "$lib/utils.js";

	export type DialogContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
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
		closeOnOutsideClick = true,
		closeOnEscape = true,
		children,
		...restProps
	}: DialogContentProps = $props();

	const dialog = getContext("dialog");

	if (!dialog) {
		throw new Error("DialogContent must be used within a Dialog component");
	}

	let contentRef: HTMLDivElement;
	let cleanupFocusTrap: (() => void) | null = null;

	// Handle focus trap when dialog opens
	$effect(() => {
		if ($dialog.open && contentRef) {
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
			dialog.closeDialog();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === "Escape") {
			dialog.closeDialog();
		}
	}
</script>

{#if $dialog.open}
	<div use:portal>
		<!-- DaisyUI Modal Structure -->
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
				data-slot="dialog-content"
				class={cn("modal-box relative max-w-lg", className)}
				role="dialog"
				aria-modal="true"
				aria-labelledby={dialog.titleId}
				aria-describedby={dialog.descriptionId}
				id={dialog.dialogId}
				tabindex="-1"
				{...restProps}
			>
				<!-- Close button -->
				<button
					class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					onclick={() => dialog.closeDialog()}
					aria-label="Close dialog"
				>
					<svg
						class="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{@render children?.()}
			</div>
		</div>
	</div>
{/if}