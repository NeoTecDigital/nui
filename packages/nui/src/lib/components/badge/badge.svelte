<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "badge badge-md font-medium transition-colors",
		variants: {
			variant: {
				default: "badge-primary",
				secondary: "badge-secondary",
				accent: "badge-accent", 
				outline: "badge-outline",
				ghost: "badge-ghost",
				success: "badge-success",
				warning: "badge-warning",
				error: "badge-error",
				info: "badge-info",
			},
			size: {
				sm: "badge-sm",
				md: "badge-md",
				lg: "badge-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
	export type BadgeSize = VariantProps<typeof badgeVariants>["size"];

	export type BadgeProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: BadgeVariant;
		size?: BadgeSize;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "md",
		ref = $bindable(null),
		children,
		...restProps
	}: BadgeProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="badge"
	class={cn(badgeVariants({ variant, size }), className)}
	{...restProps}
>
	{@render children?.()}
</div>