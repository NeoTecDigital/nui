<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, createAriaDescribedBy, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type FormFieldContext = {
		fieldId: string;
		errorId?: string;
		descriptionId?: string;
		required: boolean;
		disabled: boolean;
		invalid: boolean;
	};

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<FormFieldContext>("form-field");

	$: fieldId = context?.fieldId;
	$: errorId = context?.errorId;
	$: descriptionId = context?.descriptionId;
	$: required = context?.required ?? false;
	$: disabled = context?.disabled ?? false;
	$: invalid = context?.invalid ?? false;

	// Combine description and error IDs for aria-describedby
	$: ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
</script>

<div
	bind:this={ref}
	data-slot="form-control"
	class={cn("relative", className)}
	{...restProps}
>
	{@render children?.({
		id: fieldId,
		"aria-describedby": ariaDescribedBy,
		"aria-invalid": invalid,
		"aria-required": required,
		disabled,
		required,
		invalid
	})}
</div>