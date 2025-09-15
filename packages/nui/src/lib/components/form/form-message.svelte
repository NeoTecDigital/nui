<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type FormFieldContext = {
		errorId?: string;
		invalid: boolean;
	};

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/**
		 * The type of message - error or description
		 */
		type?: "error" | "description";
	};

	let {
		ref = $bindable(null),
		type = "error",
		class: className,
		children,
		...restProps
	}: Props = $props();

	const context = getContext<FormFieldContext>("form-field");

	$: errorId = context?.errorId;
	$: invalid = context?.invalid ?? false;
	$: shouldShow = type === "error" ? invalid : true;
</script>

{#if shouldShow}
	<div
		bind:this={ref}
		data-slot="form-message"
		id={type === "error" ? errorId : undefined}
		class={cn(
			"text-xs mt-1",
			{
				"text-error": type === "error",
				"text-base-content/70": type === "description",
			},
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}