<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<
		HTMLTextareaAttributes & {
			/**
			 * Whether the textarea is invalid
			 */
			invalid?: boolean;
			/**
			 * Whether the textarea should auto-resize based on content
			 */
			autoResize?: boolean;
			/**
			 * Minimum number of rows to display
			 */
			minRows?: number;
			/**
			 * Maximum number of rows to display (for auto-resize)
			 */
			maxRows?: number;
		}
	>;

	let {
		ref = $bindable(null),
		value = $bindable(""),
		invalid = false,
		autoResize = false,
		minRows = 3,
		maxRows,
		rows = minRows,
		class: className,
		disabled,
		...restProps
	}: Props = $props();

	// Auto-resize functionality
	function handleInput() {
		if (autoResize && ref) {
			// Reset height to auto to get the correct scrollHeight
			ref.style.height = "auto";
			
			// Calculate the number of rows needed
			const lineHeight = parseInt(getComputedStyle(ref).lineHeight);
			const currentRows = Math.ceil(ref.scrollHeight / lineHeight);
			
			// Apply min/max constraints
			let newRows = Math.max(currentRows, minRows);
			if (maxRows) {
				newRows = Math.min(newRows, maxRows);
			}
			
			// Set the height
			ref.style.height = `${newRows * lineHeight}px`;
		}
	}

	// Initialize auto-resize on mount
	$effect(() => {
		if (autoResize && ref) {
			handleInput();
		}
	});
</script>

<textarea
	bind:this={ref}
	bind:value
	data-slot="textarea"
	class={cn(
		"textarea textarea-bordered w-full resize-none focus:textarea-primary disabled:cursor-not-allowed disabled:opacity-50",
		{
			"textarea-error": invalid,
			"resize-y": !autoResize,
		},
		className
	)}
	{rows}
	{disabled}
	aria-invalid={invalid}
	oninput={handleInput}
	{...restProps}
></textarea>