<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<HTMLLabelAttributes, HTMLLabelElement> & {
		/**
		 * Whether the label is for a required field
		 */
		required?: boolean;
		/**
		 * Whether the associated form control is invalid
		 */
		invalid?: boolean;
		/**
		 * Whether the associated form control is disabled
		 */
		disabled?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		required = false,
		invalid = false,
		disabled = false,
		children,
		...restProps
	}: Props = $props();
</script>

<label
	bind:this={ref}
	data-slot="label"
	class={cn(
		"label cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		{
			"text-error": invalid,
			"opacity-50 cursor-not-allowed": disabled,
		},
		className
	)}
	{...restProps}
>
	<span class="label-text">
		{@render children?.()}
		{#if required}
			<span class="text-error ml-1" aria-label="required">*</span>
		{/if}
	</span>
</label>