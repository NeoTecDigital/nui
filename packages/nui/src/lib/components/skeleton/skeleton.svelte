<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const skeletonVariants = tv({
		base: "animate-pulse bg-base-300 rounded",
		variants: {
			variant: {
				default: "bg-base-300",
				text: "bg-base-300 rounded-sm",
				circular: "bg-base-300 rounded-full",
				rectangular: "bg-base-300 rounded",
				rounded: "bg-base-300 rounded-lg", 
			},
			size: {
				sm: "",
				md: "",
				lg: "",
				xl: "",
			},
			animation: {
				pulse: "animate-pulse",
				wave: "animate-pulse",
				none: "",
			},
		},
		compoundVariants: [
			// Text sizes
			{
				variant: "text",
				size: "sm",
				class: "h-3",
			},
			{
				variant: "text", 
				size: "md",
				class: "h-4",
			},
			{
				variant: "text",
				size: "lg", 
				class: "h-5",
			},
			{
				variant: "text",
				size: "xl",
				class: "h-6",
			},
			// Circular sizes  
			{
				variant: "circular",
				size: "sm",
				class: "w-8 h-8",
			},
			{
				variant: "circular",
				size: "md", 
				class: "w-12 h-12",
			},
			{
				variant: "circular",
				size: "lg",
				class: "w-16 h-16",
			},
			{
				variant: "circular",
				size: "xl", 
				class: "w-20 h-20",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
			animation: "pulse",
		},
	});

	export type SkeletonVariant = VariantProps<typeof skeletonVariants>["variant"];
	export type SkeletonSize = VariantProps<typeof skeletonVariants>["size"];
	export type SkeletonAnimation = VariantProps<typeof skeletonVariants>["animation"];

	export type SkeletonProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: SkeletonVariant;
		size?: SkeletonSize;
		animation?: SkeletonAnimation;
		width?: string | number;
		height?: string | number;
		count?: number;
		spacing?: string;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "md",
		animation = "pulse",
		width,
		height,
		count = 1,
		spacing = "0.5rem",
		ref = $bindable(null),
		style,
		...restProps
	}: SkeletonProps = $props();

	// Convert width/height to CSS values
	function toCssValue(value: string | number | undefined): string | undefined {
		if (value === undefined) return undefined;
		return typeof value === "number" ? `${value}px` : value;
	}

	const cssWidth = $derived(() => toCssValue(width));
	const cssHeight = $derived(() => toCssValue(height));

	// Generate inline styles
	const inlineStyles = $derived(() => {
		const styles: Record<string, string> = {};
		
		if (cssWidth) styles.width = cssWidth;
		if (cssHeight) styles.height = cssHeight;
		
		// Default dimensions for different variants
		if (!cssWidth && !cssHeight) {
			switch (variant) {
				case "text":
					styles.width = "100%";
					break;
				case "circular":
					// Handled by compound variants
					break;
				case "rectangular":
					styles.width = "100%";
					styles.height = "200px";
					break;
				case "rounded":
					styles.width = "100%";
					styles.height = "150px";
					break;
				default:
					styles.width = "100%";
					styles.height = "20px";
					break;
			}
		}
		
		return Object.entries(styles)
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ");
	});

	const combinedStyle = $derived(() => {
		const base = inlineStyles;
		const custom = style || "";
		return [base, custom].filter(Boolean).join("; ");
	});
</script>

{#if count === 1}
	<div
		bind:this={ref}
		class={cn(skeletonVariants({ variant, size, animation }), className)}
		style={combinedStyle}
		role="status"
		aria-label="Loading..."
		data-skeleton=""
		{...restProps}
	></div>
{:else}
	<div class="space-y-[{spacing}]" bind:this={ref}>
		{#each Array(count) as _, index}
			<div
				class={cn(skeletonVariants({ variant, size, animation }), className)}
				style={combinedStyle}
				role="status"
				aria-label="Loading..."
				data-skeleton=""
				{...restProps}
			></div>
		{/each}
	</div>
{/if}