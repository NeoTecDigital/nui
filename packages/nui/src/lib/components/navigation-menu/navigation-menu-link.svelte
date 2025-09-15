<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
</script>

<script lang="ts">
	export const navigationLinkVariants = tv({
		base: "block w-full text-left transition-colors hover:bg-base-200 focus:bg-base-200 focus:outline-none rounded-lg",
		variants: {
			active: {
				true: "bg-base-200 font-semibold",
			},
			size: {
				sm: "px-2 py-1 text-sm",
				default: "px-3 py-2",
				lg: "px-4 py-3 text-lg",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type NavigationMenuLinkProps = WithElementRef<HTMLAnchorAttributes> & 
		VariantProps<typeof navigationLinkVariants> & {
			active?: boolean;
		};

	let {
		class: className,
		active = false,
		size = "default",
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: NavigationMenuLinkProps = $props();
</script>

<a
	bind:this={ref}
	{href}
	class={cn(navigationLinkVariants({ active, size }), className)}
	aria-current={active ? "page" : undefined}
	{...restProps}
>
	{@render children?.()}
</a>