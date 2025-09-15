<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const avatarVariants = tv({
		base: "avatar",
		variants: {
			size: {
				xs: "w-6 h-6",
				sm: "w-8 h-8",
				md: "w-12 h-12",
				lg: "w-16 h-16",
				xl: "w-20 h-20",
			},
			shape: {
				circle: "rounded-full",
				square: "rounded-lg",
			},
		},
		defaultVariants: {
			size: "md",
			shape: "circle",
		},
	});

	export type AvatarSize = VariantProps<typeof avatarVariants>["size"];
	export type AvatarShape = VariantProps<typeof avatarVariants>["shape"];

	export type AvatarProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: AvatarSize;
		shape?: AvatarShape;
	};
</script>

<script lang="ts">
	let {
		class: className,
		size = "md",
		shape = "circle",
		ref = $bindable(null),
		children,
		...restProps
	}: AvatarProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="avatar"
	class={cn(avatarVariants({ size, shape }), className)}
	{...restProps}
>
	{@render children?.()}
</div>