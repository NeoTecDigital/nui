<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const calendarVariants = tv({
		base: "p-3",
		variants: {
			variant: {
				default: "",
				bordered: "border border-base-300 rounded-lg",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CalendarVariant = VariantProps<typeof calendarVariants>["variant"];

	export interface CalendarProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		variant?: CalendarVariant;
		selected?: Date | Date[] | null;
		disabled?: boolean;
		readonly?: boolean;
		minDate?: Date;
		maxDate?: Date;
		locale?: string;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		onselect?: (date: Date | Date[] | null) => void;
		mode?: "single" | "multiple" | "range";
	}

	interface CalendarState {
		currentMonth: Date;
		selectedDates: Date[];
	}

	function isSameDay(date1: Date, date2: Date): boolean {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	}

	function isSameMonth(date1: Date, date2: Date): boolean {
		return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
	}

	function getDaysInMonth(date: Date): Date[] {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const days: Date[] = [];

		for (let day = 1; day <= lastDay.getDate(); day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	}

	function getCalendarWeeks(date: Date, weekStartsOn: number = 0): Date[][] {
		const days = getDaysInMonth(date);
		const firstDay = days[0];
		const lastDay = days[days.length - 1];

		// Get padding days from previous month
		const startPadding = (firstDay.getDay() - weekStartsOn + 7) % 7;
		const paddingStart: Date[] = [];
		for (let i = startPadding; i > 0; i--) {
			paddingStart.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - i));
		}

		// Get padding days from next month
		const endPadding = (6 - lastDay.getDay() + weekStartsOn) % 7;
		const paddingEnd: Date[] = [];
		for (let i = 1; i <= endPadding; i++) {
			paddingEnd.push(new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i));
		}

		const allDays = [...paddingStart, ...days, ...paddingEnd];
		const weeks: Date[][] = [];
		for (let i = 0; i < allDays.length; i += 7) {
			weeks.push(allDays.slice(i, i + 7));
		}

		return weeks;
	}
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		selected = null,
		disabled = false,
		readonly = false,
		minDate,
		maxDate,
		locale = "en-US",
		weekStartsOn = 0,
		onselect,
		mode = "single",
		ref = $bindable(null),
		children,
		...restProps
	}: CalendarProps = $props();

	let state = $state<CalendarState>({
		currentMonth: selected instanceof Date ? selected : new Date(),
		selectedDates: selected
			? Array.isArray(selected)
				? selected
				: [selected]
			: [],
	});

	const monthNames = $derived(
		Array.from({ length: 12 }, (_, i) =>
			new Date(2000, i, 1).toLocaleDateString(locale, { month: "long" })
		)
	);

	const weekDayNames = $derived(
		Array.from({ length: 7 }, (_, i) => {
			const day = new Date(2000, 0, 2 + i); // Start from a Sunday
			const adjustedDay = new Date(2000, 0, 2 + ((i + weekStartsOn) % 7));
			return adjustedDay.toLocaleDateString(locale, { weekday: "short" });
		})
	);

	const weeks = $derived(getCalendarWeeks(state.currentMonth, weekStartsOn));

	function isSelected(date: Date): boolean {
		return state.selectedDates.some(selected => isSameDay(selected, date));
	}

	function isDisabled(date: Date): boolean {
		if (disabled) return true;
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	}

	function isInCurrentMonth(date: Date): boolean {
		return isSameMonth(date, state.currentMonth);
	}

	function selectDate(date: Date) {
		if (readonly || isDisabled(date)) return;

		if (mode === "single") {
			state.selectedDates = [date];
		} else if (mode === "multiple") {
			const index = state.selectedDates.findIndex(d => isSameDay(d, date));
			if (index >= 0) {
				state.selectedDates.splice(index, 1);
			} else {
				state.selectedDates.push(date);
			}
		} else if (mode === "range") {
			if (state.selectedDates.length === 0 || state.selectedDates.length === 2) {
				state.selectedDates = [date];
			} else if (state.selectedDates.length === 1) {
				const start = state.selectedDates[0];
				state.selectedDates = date >= start ? [start, date] : [date, start];
			}
		}

		const result = mode === "single" ? state.selectedDates[0] : state.selectedDates;
		onselect?.(result);
	}

	function previousMonth() {
		state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() - 1, 1);
	}

	function nextMonth() {
		state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 1);
	}

	function goToToday() {
		const today = new Date();
		state.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	}

	const headerId = generateId("calendar-header");
	const gridId = generateId("calendar-grid");
</script>

<div
	bind:this={ref}
	data-slot="calendar"
	class={cn(calendarVariants({ variant }), className)}
	role="application"
	aria-labelledby={headerId}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- Header -->
		<div class="flex items-center justify-between pb-4" id={headerId}>
			<button
				type="button"
				class="btn btn-ghost btn-sm"
				onclick={previousMonth}
				aria-label="Previous month"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			
			<div class="text-sm font-medium">
				{monthNames[state.currentMonth.getMonth()]} {state.currentMonth.getFullYear()}
			</div>
			
			<button
				type="button"
				class="btn btn-ghost btn-sm"
				onclick={nextMonth}
				aria-label="Next month"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Calendar Grid -->
		<div
			class="grid grid-cols-7 gap-1"
			role="grid"
			aria-labelledby={headerId}
			id={gridId}
		>
			<!-- Week day headers -->
			{#each weekDayNames as dayName}
				<div class="p-2 text-center text-xs font-medium text-base-content/70" role="columnheader">
					{dayName}
				</div>
			{/each}

			<!-- Calendar days -->
			{#each weeks as week}
				{#each week as day}
					<button
						type="button"
						class="relative p-2 text-sm transition-colors rounded-md hover:bg-base-200 focus:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						class:bg-primary={isSelected(day)}
						class:text-primary-content={isSelected(day)}
						class:text-base-content/40={!isInCurrentMonth(day)}
						disabled={isDisabled(day)}
						onclick={() => selectDate(day)}
						role="gridcell"
						aria-selected={isSelected(day)}
						aria-label={day.toLocaleDateString(locale, { 
							year: "numeric", 
							month: "long", 
							day: "numeric" 
						})}
					>
						{day.getDate()}
						{#if isSameDay(day, new Date())}
							<div class="absolute inset-x-0 bottom-1 flex justify-center">
								<div class="w-1 h-1 rounded-full bg-current"></div>
							</div>
						{/if}
					</button>
				{/each}
			{/each}
		</div>

		<!-- Today button -->
		<div class="flex justify-center pt-4">
			<button
				type="button"
				class="btn btn-sm btn-outline"
				onclick={goToToday}
			>
				Today
			</button>
		</div>
	{/if}
</div>