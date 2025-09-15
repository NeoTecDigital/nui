<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const sidebarContentVariants = tv({
		base: "flex-1 overflow-y-auto px-3 py-4",
		variants: {
			variant: {
				default: "",
				scrollable: "max-h-full",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type SidebarContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: "default" | "scrollable";
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: SidebarContentProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(sidebarContentVariants({ variant }), className)}
	data-sidebar="content"
	{...restProps}
>
	{@render children?.()}
</div>