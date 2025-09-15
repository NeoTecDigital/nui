<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type FormFieldContext = {
		fieldId: string;
		required: boolean;
		disabled: boolean;
		invalid: boolean;
	};

	type Props = WithElementRef<HTMLLabelAttributes, HTMLLabelElement>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<FormFieldContext>("form-field");

	$: fieldId = context?.fieldId;
	$: required = context?.required ?? false;
	$: disabled = context?.disabled ?? false;
	$: invalid = context?.invalid ?? false;
</script>

<label
	bind:this={ref}
	data-slot="form-label"
	for={fieldId}
	class={cn(
		"label cursor-pointer",
		{
			"text-error": invalid,
			"opacity-50 cursor-not-allowed": disabled,
		},
		className
	)}
	{...restProps}
>
	<span class="label-text font-medium">
		{@render children?.()}
		{#if required}
			<span class="text-error ml-1" aria-label="required">*</span>
		{/if}
	</span>
</label>