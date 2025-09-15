<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import { createEventDispatcher } from "svelte";

	export const toggleVariants = tv({
		base: "btn btn-ghost inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-3",
				sm: "h-8 px-2",
				lg: "h-10 px-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ToggleVariant = VariantProps<typeof toggleVariants>["variant"];
	export type ToggleSize = VariantProps<typeof toggleVariants>["size"];

	export type ToggleProps = WithElementRef<HTMLButtonAttributes> & {
		variant?: ToggleVariant;
		size?: ToggleSize;
		pressed?: boolean;
		defaultPressed?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		pressed = $bindable(),
		defaultPressed = false,
		disabled = false,
		ref = $bindable(null),
		children,
		...restProps
	}: ToggleProps = $props();

	const dispatch = createEventDispatcher<{
		pressedChange: boolean;
	}>();

	// Initialize pressed state if not provided
	if (pressed === undefined) {
		pressed = defaultPressed;
	}

	function handleClick() {
		if (!disabled) {
			const newPressed = !pressed;
			pressed = newPressed;
			dispatch("pressedChange", newPressed);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<button
	bind:this={ref}
	type="button"
	class={cn(toggleVariants({ variant, size }), className)}
	aria-pressed={pressed}
	data-state={pressed ? "on" : "off"}
	{disabled}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</button>