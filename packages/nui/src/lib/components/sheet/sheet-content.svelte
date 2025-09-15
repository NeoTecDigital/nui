<script lang="ts" module>
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, trapFocus, type WithElementRef } from "$lib/utils.js";
	import type { SheetSide } from "./sheet.svelte";

	export type SheetContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
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
	}: SheetContentProps = $props();

	const sheet = getContext("sheet");

	if (!sheet) {
		throw new Error("SheetContent must be used within a Sheet component");
	}

	let contentRef: HTMLDivElement;
	let cleanupFocusTrap: (() => void) | null = null;

	// Handle focus trap when sheet opens
	$effect(() => {
		if ($sheet.open && contentRef) {
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
			sheet.closeSheet();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === "Escape") {
			sheet.closeSheet();
		}
	}

	// Map sheet sides to DaisyUI drawer positions
	function getSheetClasses(side: SheetSide): string {
		switch (side) {
			case "right":
				return "drawer-end";
			case "left":
				return "";
			case "top":
				return "drawer-top";
			case "bottom":
				return "drawer-bottom";
			default:
				return "drawer-end";
		}
	}

	function getContentClasses(side: SheetSide): string {
		const baseClasses = "drawer-side z-50 max-w-xs w-full";
		switch (side) {
			case "right":
			case "left":
				return `${baseClasses} h-full`;
			case "top":
			case "bottom":
				return `${baseClasses} max-h-96 h-auto`;
			default:
				return `${baseClasses} h-full`;
		}
	}
</script>

{#if $sheet.open}
	<div use:portal>
		<!-- DaisyUI Drawer Structure for Sheet -->
		<div class={cn("drawer", getSheetClasses(sheet.side))}>
			<input
				type="checkbox"
				class="drawer-toggle"
				checked={$sheet.open}
				aria-hidden="true"
			/>
			
			<!-- Drawer backdrop -->
			<div 
				class="drawer-content"
				onclick={handleBackdropClick}
				onkeydown={handleKeydown}
				role="presentation"
			>
				<!-- Invisible backdrop that covers the entire screen -->
				<div class="fixed inset-0 bg-black/50 z-40"></div>
			</div>
			
			<!-- Drawer sidebar -->
			<div class={cn(getContentClasses(sheet.side))}>
				<div
					bind:this={contentRef}
					bind:this={ref}
					data-slot="sheet-content"
					class={cn("min-h-screen bg-base-100 p-6 shadow-xl", className)}
					role="dialog"
					aria-modal="true"
					aria-labelledby={sheet.titleId}
					aria-describedby={sheet.descriptionId}
					id={sheet.sheetId}
					tabindex="-1"
					{...restProps}
				>
					<!-- Close button -->
					<button
						class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
						onclick={() => sheet.closeSheet()}
						aria-label="Close sheet"
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
	</div>
{/if}