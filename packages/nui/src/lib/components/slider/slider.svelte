<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { createEventDispatcher } from "svelte";

	export type SliderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value?: number[];
		defaultValue?: number[];
		min?: number;
		max?: number;
		step?: number;
		orientation?: "horizontal" | "vertical";
		disabled?: boolean;
		inverted?: boolean;
		name?: string;
	};
</script>

<script lang="ts">
	let {
		class: className,
		value = $bindable(),
		defaultValue = [0],
		min = 0,
		max = 100,
		step = 1,
		orientation = "horizontal",
		disabled = false,
		inverted = false,
		name,
		ref = $bindable(null),
		children,
		...restProps
	}: SliderProps = $props();

	const dispatch = createEventDispatcher<{
		valueChange: number[];
	}>();

	// Initialize value if not provided
	if (!value) {
		value = defaultValue;
	}

	let isDragging = false;
	let activeThumb = 0;

	function normalizeValue(val: number): number {
		return Math.max(min, Math.min(max, Math.round(val / step) * step));
	}

	function getPercentage(val: number): number {
		return ((val - min) / (max - min)) * 100;
	}

	function getValueFromPosition(clientX: number, clientY: number): number {
		if (!ref) return min;

		const rect = ref.getBoundingClientRect();
		let percentage: number;

		if (orientation === "horizontal") {
			const x = clientX - rect.left;
			percentage = x / rect.width;
		} else {
			const y = clientY - rect.top;
			percentage = 1 - (y / rect.height);
		}

		if (inverted) {
			percentage = 1 - percentage;
		}

		return normalizeValue(min + percentage * (max - min));
	}

	function updateValue(newValue: number, thumbIndex: number = 0) {
		if (disabled) return;

		const newValues = [...value];
		newValues[thumbIndex] = newValue;
		
		// Ensure values don't overlap
		if (newValues.length > 1) {
			newValues.sort((a, b) => a - b);
		}
		
		value = newValues;
		dispatch("valueChange", newValues);
	}

	function handlePointerDown(event: PointerEvent, thumbIndex: number) {
		if (disabled) return;

		isDragging = true;
		activeThumb = thumbIndex;
		
		const target = event.target as Element;
		target.setPointerCapture(event.pointerId);
		
		event.preventDefault();
	}

	function handlePointerMove(event: PointerEvent) {
		if (!isDragging || disabled) return;

		const newValue = getValueFromPosition(event.clientX, event.clientY);
		updateValue(newValue, activeThumb);
	}

	function handlePointerUp(event: PointerEvent) {
		if (!isDragging) return;

		isDragging = false;
		const target = event.target as Element;
		target.releasePointerCapture(event.pointerId);
	}

	function handleKeyDown(event: KeyboardEvent, thumbIndex: number) {
		if (disabled) return;

		let newValue = value[thumbIndex];

		switch (event.key) {
			case "ArrowLeft":
			case "ArrowDown":
				newValue = normalizeValue(newValue - step);
				break;
			case "ArrowRight":
			case "ArrowUp":
				newValue = normalizeValue(newValue + step);
				break;
			case "Home":
				newValue = min;
				break;
			case "End":
				newValue = max;
				break;
			case "PageUp":
				newValue = normalizeValue(newValue + step * 10);
				break;
			case "PageDown":
				newValue = normalizeValue(newValue - step * 10);
				break;
			default:
				return;
		}

		event.preventDefault();
		updateValue(newValue, thumbIndex);
	}

	function handleTrackClick(event: MouseEvent) {
		if (disabled || isDragging) return;

		const newValue = getValueFromPosition(event.clientX, event.clientY);
		
		// Find closest thumb
		let closestThumb = 0;
		if (value.length > 1) {
			const distances = value.map(val => Math.abs(val - newValue));
			closestThumb = distances.indexOf(Math.min(...distances));
		}
		
		updateValue(newValue, closestThumb);
	}
</script>

<div
	bind:this={ref}
	class={cn(
		"range relative w-full touch-none select-none",
		orientation === "vertical" && "h-full w-4 flex-col",
		disabled && "opacity-50 cursor-not-allowed",
		className
	)}
	role="slider"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value[0]}
	aria-orientation={orientation}
	aria-disabled={disabled}
	data-orientation={orientation}
	onpointerdown={handleTrackClick}
	{...restProps}
>
	<!-- Track -->
	<div
		class={cn(
			"relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
			orientation === "vertical" && "h-full w-1.5"
		)}
	>
		<!-- Range -->
		{#each value as val, i}
			{#if i === 0}
				<div
					class="absolute h-full bg-primary"
					style={orientation === "horizontal"
						? `left: 0%; width: ${getPercentage(val)}%`
						: `bottom: 0%; height: ${getPercentage(val)}%`}
				></div>
			{/if}
		{/each}
	</div>

	<!-- Thumbs -->
	{#each value as val, i}
		<button
			type="button"
			class={cn(
				"absolute block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors",
				"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
				"disabled:pointer-events-none disabled:opacity-50",
				"hover:bg-accent",
				orientation === "horizontal" ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2"
			)}
			style={orientation === "horizontal"
				? `left: ${getPercentage(val)}%; transform: translateX(-50%) translateY(-50%)`
				: `bottom: ${getPercentage(val)}%; transform: translateX(-50%) translateY(50%)`}
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={val}
			aria-orientation={orientation}
			tabindex={disabled ? -1 : 0}
			{disabled}
			onpointerdown={(e) => handlePointerDown(e, i)}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onkeydown={(e) => handleKeyDown(e, i)}
		>
			<span class="sr-only">Slider thumb {i + 1}</span>
		</button>
	{/each}

	<!-- Hidden inputs for form submission -->
	{#if name}
		{#each value as val, i}
			<input type="hidden" name={`${name}${value.length > 1 ? `[${i}]` : ''}`} value={val} />
		{/each}
	{/if}

	{@render children?.()}
</div>