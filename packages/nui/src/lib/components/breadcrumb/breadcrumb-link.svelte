<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	export const breadcrumbLinkVariants = tv({
		base: "transition-colors hover:text-primary focus:text-primary focus:outline-none",
		variants: {
			current: {
				true: "text-base-content font-medium pointer-events-none",
				false: "text-base-content/70 hover:text-base-content",
			},
		},
		defaultVariants: {
			current: false,
		},
	});

	export type BreadcrumbLinkProps = WithElementRef<HTMLAnchorAttributes> & 
		VariantProps<typeof breadcrumbLinkVariants> & {
			current?: boolean;
		};

	let {
		class: className,
		current = false,
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: BreadcrumbLinkProps = $props();
</script>

<a
	bind:this={ref}
	{href}
	class={cn(breadcrumbLinkVariants({ current }), className)}
	aria-current={current ? "page" : undefined}
	{...restProps}
>
	{@render children?.()}
</a>