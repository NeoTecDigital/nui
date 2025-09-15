<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const breadcrumbVariants = tv({
		base: "breadcrumbs",
		variants: {
			size: {
				sm: "text-sm",
				default: "text-base",
				lg: "text-lg",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type BreadcrumbProps = WithElementRef<HTMLAttributes<HTMLElement>> & 
		VariantProps<typeof breadcrumbVariants>;
</script>

<script lang="ts">
	let {
		class: className,
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbProps = $props();
</script>

<nav
	bind:this={ref}
	aria-label="Breadcrumb"
	class={cn(breadcrumbVariants({ size }), className)}
	{...restProps}
>
	{@render children?.()}
</nav>