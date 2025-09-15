<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const progressVariants = tv({
		base: "progress w-full",
		variants: {
			variant: {
				default: "progress-primary",
				secondary: "progress-secondary",
				accent: "progress-accent",
				success: "progress-success",
				warning: "progress-warning",
				error: "progress-error",
				info: "progress-info",
			},
			size: {
				sm: "progress-sm",
				md: "progress-md", 
				lg: "progress-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	});

	export type ProgressVariant = VariantProps<typeof progressVariants>["variant"];
	export type ProgressSize = VariantProps<typeof progressVariants>["size"];

	export type ProgressProps = WithElementRef<HTMLAttributes<HTMLProgressElement>> & {
		variant?: ProgressVariant;
		size?: ProgressSize;
		value?: number;
		max?: number;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "md",
		value = 0,
		max = 100,
		ref = $bindable(null),
		...restProps
	}: ProgressProps = $props();
</script>

<progress
	bind:this={ref}
	data-slot="progress"
	class={cn(progressVariants({ variant, size }), className)}
	{value}
	{max}
	{...restProps}
></progress>