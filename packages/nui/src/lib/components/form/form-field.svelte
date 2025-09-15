<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import { setContext } from "svelte";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/**
		 * The name of the form field
		 */
		name: string;
		/**
		 * Whether the field is required
		 */
		required?: boolean;
		/**
		 * Whether the field is disabled
		 */
		disabled?: boolean;
		/**
		 * Error message to display
		 */
		error?: string;
		/**
		 * Help text to display
		 */
		description?: string;
	};

	let {
		ref = $bindable(null),
		name,
		required = false,
		disabled = false,
		error,
		description,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const fieldId = generateId(`field-${name}`);
	const errorId = error ? `${fieldId}-error` : undefined;
	const descriptionId = description ? `${fieldId}-description` : undefined;

	// Set context for child components
	setContext("form-field", {
		name,
		fieldId,
		errorId,
		descriptionId,
		required,
		disabled,
		invalid: !!error,
	});
</script>

<div
	bind:this={ref}
	data-slot="form-field"
	class={cn("form-control w-full", className)}
	{...restProps}
>
	{@render children?.()}
	
	{#if description}
		<div class="label">
			<span id={descriptionId} class="label-text-alt text-base-content/70">
				{description}
			</span>
		</div>
	{/if}
	
	{#if error}
		<div class="label">
			<span id={errorId} class="label-text-alt text-error">
				{error}
			</span>
		</div>
	{/if}
</div>