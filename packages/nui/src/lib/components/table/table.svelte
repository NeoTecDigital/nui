<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLTableAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const tableVariants = tv({
		base: "table w-full",
		variants: {
			variant: {
				default: "",
				zebra: "table-zebra",
				compact: "table-compact",
				pin: "table-pin-rows table-pin-cols",
			},
			size: {
				default: "",
				xs: "table-xs",
				sm: "table-sm",
				md: "table-md",
				lg: "table-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type TableVariant = VariantProps<typeof tableVariants>["variant"];
	export type TableSize = VariantProps<typeof tableVariants>["size"];

	export type TableProps = WithElementRef<HTMLTableAttributes> & {
		variant?: TableVariant;
		size?: TableSize;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: TableProps = $props();
</script>

<div class="overflow-x-auto">
	<table
		bind:this={ref}
		data-slot="table"
		class={cn(tableVariants({ variant, size }), className)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>