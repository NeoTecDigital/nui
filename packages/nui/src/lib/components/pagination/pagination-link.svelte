<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const paginationLinkVariants = tv({
		base: "btn btn-sm",
		variants: {
			variant: {
				default: "btn-ghost",
				outline: "btn-outline",
			},
			isActive: {
				true: "btn-active",
				false: "",
			},
		},
		defaultVariants: {
			variant: "default",
			isActive: false,
		},
	});

	export type PaginationLinkVariant = VariantProps<typeof paginationLinkVariants>["variant"];

	export type PaginationLinkProps = (
		| (WithElementRef<HTMLButtonAttributes> & { href?: never })
		| (WithElementRef<HTMLAnchorAttributes> & { href: string })
	) & {
		variant?: PaginationLinkVariant;
		isActive?: boolean;
		size?: "default" | "sm" | "lg" | "icon";
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		isActive = false,
		size = "default",
		href,
		ref = $bindable(null),
		children,
		...restProps
	}: PaginationLinkProps = $props();

	const sizeClasses = {
		default: "btn-sm",
		sm: "btn-xs", 
		lg: "btn-md",
		icon: "btn-square btn-sm",
	};
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="pagination-link"
		class={cn(paginationLinkVariants({ variant, isActive }), sizeClasses[size], className)}
		{href}
		aria-current={isActive ? "page" : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="pagination-link"
		class={cn(paginationLinkVariants({ variant, isActive }), sizeClasses[size], className)}
		aria-current={isActive ? "page" : undefined}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}