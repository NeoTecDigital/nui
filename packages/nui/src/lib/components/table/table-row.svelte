<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const tableRowVariants = tv({
		base: "border-b transition-colors hover:bg-base-200/50 data-[state=selected]:bg-base-200",
		variants: {
			variant: {
				default: "",
				active: "active",
				hover: "hover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type TableRowVariant = VariantProps<typeof tableRowVariants>["variant"];

	export type TableRowProps = WithElementRef<HTMLAttributes<HTMLTableRowElement>> & {
		variant?: TableRowVariant;
		selected?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		selected = false,
		ref = $bindable(null),
		children,
		...restProps
	}: TableRowProps = $props();
</script>

<tr
	bind:this={ref}
	data-slot="table-row"
	data-state={selected ? "selected" : undefined}
	class={cn(tableRowVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</tr>