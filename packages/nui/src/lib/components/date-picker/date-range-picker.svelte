<script lang="ts" module>
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const dateRangePickerVariants = tv({
		base: "input input-bordered w-full",
		variants: {
			size: {
				sm: "input-sm",
				md: "input-md", 
				lg: "input-lg",
			},
			variant: {
				default: "",
				ghost: "input-ghost",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	});

	export interface DateRange {
		from: Date | null;
		to: Date | null;
	}

	export type DateRangePickerProps = WithElementRef<HTMLInputAttributes> & {
		value?: DateRange;
		min?: Date;
		max?: Date;
		disabled?: boolean;
		placeholder?: string;
		size?: "sm" | "md" | "lg";
		variant?: "default" | "ghost";
		format?: "MM/dd/yyyy" | "dd/MM/yyyy" | "yyyy-MM-dd";
		showCalendarIcon?: boolean;
		separator?: string;
		onRangeChange?: (range: DateRange) => void;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	let {
		class: className,
		value = $bindable({ from: null, to: null }),
		min,
		max,
		disabled = false,
		placeholder = "Select date range",
		size = "md",
		variant = "default",
		format = "MM/dd/yyyy",
		showCalendarIcon = true,
		separator = " - ",
		onRangeChange,
		ref = $bindable(null),
		id = generateId("date-range-picker"),
		...restProps
	}: DateRangePickerProps = $props();

	const dispatch = createEventDispatcher<{
		change: DateRange;
		open: void;
		close: void;
	}>();

	let isOpen = $state(false);
	let inputValue = $state("");
	let calendarRef: HTMLDivElement | null = null;
	let selectingStart = $state(true);

	// Format date to string
	function formatDate(date: Date | null): string {
		if (!date) return "";
		
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		
		switch (format) {
			case "dd/MM/yyyy":
				return `${day}/${month}/${year}`;
			case "yyyy-MM-dd":
				return `${year}-${month}-${day}`;
			default:
				return `${month}/${day}/${year}`;
		}
	}

	// Format date range to string
	function formatDateRange(range: DateRange): string {
		const fromStr = formatDate(range.from);
		const toStr = formatDate(range.to);
		
		if (!fromStr && !toStr) return "";
		if (!fromStr) return toStr;
		if (!toStr) return fromStr;
		
		return `${fromStr}${separator}${toStr}`;
	}

	// Update input when value changes
	$effect(() => {
		inputValue = formatDateRange(value);
	});

	// Validate date constraints
	function isDateValid(date: Date | null): boolean {
		if (!date) return true;
		if (min && date < min) return false;
		if (max && date > max) return false;
		return true;
	}

	function openCalendar() {
		if (!disabled) {
			isOpen = true;
			selectingStart = true;
			dispatch("open");
		}
	}

	function closeCalendar() {
		isOpen = false;
		dispatch("close");
	}

	// Close calendar when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (calendarRef && !calendarRef.contains(event.target as Node) && 
			ref && !ref.contains(event.target as Node)) {
			closeCalendar();
		}
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	// Generate calendar days for current month
	function getCalendarDays(date: Date): Array<{ 
		date: Date; 
		isCurrentMonth: boolean; 
		isToday: boolean; 
		isInRange: boolean;
		isRangeStart: boolean;
		isRangeEnd: boolean;
	}> {
		const year = date.getFullYear();
		const month = date.getMonth();
		
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const startDate = new Date(firstDay);
		startDate.setDate(startDate.getDate() - firstDay.getDay());
		
		const days = [];
		const today = new Date();
		
		for (let i = 0; i < 42; i++) { // 6 weeks
			const currentDate = new Date(startDate);
			currentDate.setDate(startDate.getDate() + i);
			
			const isRangeStart = value.from ? currentDate.toDateString() === value.from.toDateString() : false;
			const isRangeEnd = value.to ? currentDate.toDateString() === value.to.toDateString() : false;
			
			let isInRange = false;
			if (value.from && value.to) {
				isInRange = currentDate >= value.from && currentDate <= value.to;
			}
			
			days.push({
				date: currentDate,
				isCurrentMonth: currentDate.getMonth() === month,
				isToday: currentDate.toDateString() === today.toDateString(),
				isInRange,
				isRangeStart,
				isRangeEnd,
			});
		}
		
		return days;
	}

	let currentCalendarDate = $state(value.from || new Date());
	let calendarDays = $derived(() => getCalendarDays(currentCalendarDate));

	function selectDate(date: Date) {
		if (!isDateValid(date)) return;
		
		if (selectingStart || !value.from) {
			// Start new range
			value = { from: date, to: null };
			selectingStart = false;
		} else {
			// Complete range
			if (date < value.from) {
				// If end date is before start, swap them
				value = { from: date, to: value.from };
			} else {
				value = { from: value.from, to: date };
			}
			selectingStart = true;
			closeCalendar();
		}
		
		onRangeChange?.(value);
		dispatch("change", value);
	}

	function clearRange() {
		value = { from: null, to: null };
		selectingStart = true;
		onRangeChange?.(value);
		dispatch("change", value);
	}

	function navigateMonth(direction: 1 | -1) {
		const newDate = new Date(currentCalendarDate);
		newDate.setMonth(newDate.getMonth() + direction);
		currentCalendarDate = newDate;
	}

	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	
	const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
</script>

<div class="relative">
	<div class="relative">
		<input
			bind:this={ref}
			bind:value={inputValue}
			{id}
			class={cn(dateRangePickerVariants({ size, variant }), showCalendarIcon && "pr-10", className)}
			{placeholder}
			{disabled}
			type="text"
			readonly
			autocomplete="off"
			aria-label="Date range picker input"
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			on:focus={openCalendar}
			on:click={openCalendar}
			on:keydown={(e) => {
				if (e.key === "Escape") {
					closeCalendar();
				} else if (e.key === "Enter") {
					e.preventDefault();
					if (!isOpen) openCalendar();
				}
			}}
			{...restProps}
		/>
		
		{#if showCalendarIcon}
			<button
				type="button"
				class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-base-200 rounded transition-colors"
				{disabled}
				on:click={openCalendar}
				aria-label="Open calendar"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
					<line x1="16" y1="2" x2="16" y2="6"></line>
					<line x1="8" y1="2" x2="8" y2="6"></line>
					<line x1="3" y1="10" x2="21" y2="10"></line>
				</svg>
			</button>
		{/if}
	</div>

	{#if isOpen}
		<div
			bind:this={calendarRef}
			class="absolute top-full left-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 min-w-72"
			role="dialog"
			aria-label="Date range calendar"
		>
			<!-- Selection Instructions -->
			<div class="mb-3 text-sm text-base-content/70 text-center">
				{#if selectingStart || !value.from}
					Select start date
				{:else}
					Select end date
				{/if}
			</div>

			<!-- Calendar Header -->
			<div class="flex items-center justify-between mb-4">
				<button
					type="button"
					class="btn btn-ghost btn-sm btn-square"
					on:click={() => navigateMonth(-1)}
					aria-label="Previous month"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
				
				<h2 class="font-semibold text-lg">
					{monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
				</h2>
				
				<button
					type="button"
					class="btn btn-ghost btn-sm btn-square"
					on:click={() => navigateMonth(1)}
					aria-label="Next month"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</button>
			</div>

			<!-- Day Headers -->
			<div class="grid grid-cols-7 gap-1 mb-2">
				{#each dayNames as day}
					<div class="text-xs font-medium text-base-content/60 text-center p-2">
						{day}
					</div>
				{/each}
			</div>

			<!-- Calendar Days -->
			<div class="grid grid-cols-7 gap-1">
				{#each calendarDays as day}
					<button
						type="button"
						class="relative p-2 text-sm text-center rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						class:text-base-content/40={!day.isCurrentMonth}
						class:bg-primary={day.isRangeStart || day.isRangeEnd}
						class:text-primary-content={day.isRangeStart || day.isRangeEnd}
						class:bg-primary/20={day.isInRange && !day.isRangeStart && !day.isRangeEnd}
						class:hover:bg-base-200={!day.isInRange}
						class:ring-2={day.isToday && !day.isRangeStart && !day.isRangeEnd}
						class:ring-primary={day.isToday && !day.isRangeStart && !day.isRangeEnd}
						disabled={!isDateValid(day.date)}
						on:click={() => selectDate(day.date)}
						aria-label={day.date.toLocaleDateString()}
					>
						{day.date.getDate()}
					</button>
				{/each}
			</div>

			<!-- Action Buttons -->
			<div class="mt-4 pt-3 border-t border-base-300 flex gap-2">
				<button
					type="button"
					class="btn btn-ghost btn-sm flex-1"
					on:click={clearRange}
				>
					Clear
				</button>
				<button
					type="button"
					class="btn btn-ghost btn-sm flex-1"
					on:click={() => {
						const today = new Date();
						selectDate(today);
					}}
				>
					Today
				</button>
			</div>
		</div>
	{/if}
</div>