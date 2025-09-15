import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import DatePicker from "./date-picker.svelte";
import DateRangePicker from "./date-range-picker.svelte";

describe("Date Picker Components", () => {
	describe("DatePicker", () => {
		it("renders with default props", () => {
			render(DatePicker, {});
			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute("placeholder", "Select date");
		});

		it("formats date correctly", async () => {
			const date = new Date(2024, 0, 15); // January 15, 2024
			render(DatePicker, { value: date });
			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("01/15/2024");
		});

		it("formats date with different format", async () => {
			const date = new Date(2024, 0, 15);
			render(DatePicker, { value: date, format: "dd/MM/yyyy" });
			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("15/01/2024");
		});

		it("opens calendar on input focus", async () => {
			render(DatePicker, {});
			const input = screen.getByRole("textbox");
			
			await fireEvent.focus(input);
			
			await waitFor(() => {
				expect(screen.getByRole("dialog")).toBeInTheDocument();
			});
		});

		it("opens calendar on icon click", async () => {
			render(DatePicker, {});
			const iconButton = screen.getByLabelText("Open calendar");
			
			await fireEvent.click(iconButton);
			
			await waitFor(() => {
				expect(screen.getByRole("dialog")).toBeInTheDocument();
			});
		});

		it("closes calendar on escape key", async () => {
			render(DatePicker, {});
			const input = screen.getByRole("textbox");
			
			await fireEvent.focus(input);
			await waitFor(() => {
				expect(screen.getByRole("dialog")).toBeInTheDocument();
			});
			
			await fireEvent.keyDown(input, { key: "Escape" });
			
			await waitFor(() => {
				expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
			});
		});

		it("dispatches change event when date is selected", async () => {
			const onDateChange = vi.fn();
			render(DatePicker, { onDateChange });
			
			const input = screen.getByRole("textbox");
			await fireEvent.focus(input);
			
			await waitFor(() => {
				expect(screen.getByRole("dialog")).toBeInTheDocument();
			});
			
			// Click on a date (15th of current month)
			const dateButton = screen.getByLabelText(new RegExp("15"));
			await fireEvent.click(dateButton);
			
			expect(onDateChange).toHaveBeenCalled();
		});

		it("respects min/max date constraints", () => {
			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);
			
			render(DatePicker, { 
				min: tomorrow
			});
			
			const input = screen.getByRole("textbox");
			fireEvent.focus(input);
			
			// Today's button should be disabled
			waitFor(() => {
				const todayButton = screen.getByLabelText(today.toLocaleDateString());
				expect(todayButton).toBeDisabled();
			});
		});

		it("applies size variants", () => {
			render(DatePicker, { size: "sm" });
			const input = screen.getByRole("textbox");
			expect(input).toHaveClass("input-sm");
		});

		it("applies variant styles", () => {
			render(DatePicker, { variant: "ghost" });
			const input = screen.getByRole("textbox");
			expect(input).toHaveClass("input-ghost");
		});

		it("disables input and icon when disabled", () => {
			render(DatePicker, { disabled: true });
			const input = screen.getByRole("textbox");
			const iconButton = screen.getByLabelText("Open calendar");
			
			expect(input).toBeDisabled();
			expect(iconButton).toBeDisabled();
		});
	});

	describe("DateRangePicker", () => {
		it("renders with default props", () => {
			render(DateRangePicker, {});
			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute("placeholder", "Select date range");
		});

		it("formats date range correctly", async () => {
			const from = new Date(2024, 0, 15);
			const to = new Date(2024, 0, 20);
			render(DateRangePicker, { value: { from, to } });
			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("01/15/2024 - 01/20/2024");
		});

		it("shows selection instructions", async () => {
			render(DateRangePicker, {});
			const input = screen.getByRole("textbox");
			
			await fireEvent.focus(input);
			
			await waitFor(() => {
				expect(screen.getByText("Select start date")).toBeInTheDocument();
			});
		});

		it("handles range selection flow", async () => {
			const onRangeChange = vi.fn();
			render(DateRangePicker, { onRangeChange });
			
			const input = screen.getByRole("textbox");
			await fireEvent.focus(input);
			
			await waitFor(() => {
				expect(screen.getByRole("dialog")).toBeInTheDocument();
			});
			
			// Select start date (15th)
			const startDate = screen.getByLabelText(new RegExp("15"));
			await fireEvent.click(startDate);
			
			expect(onRangeChange).toHaveBeenCalledWith({
				from: expect.any(Date),
				to: null
			});
			
			// Instructions should change
			await waitFor(() => {
				expect(screen.getByText("Select end date")).toBeInTheDocument();
			});
			
			// Select end date (20th)
			const endDate = screen.getByLabelText(new RegExp("20"));
			await fireEvent.click(endDate);
			
			expect(onRangeChange).toHaveBeenCalledWith({
				from: expect.any(Date),
				to: expect.any(Date)
			});
		});

		it("swaps dates if end is before start", async () => {
			const onRangeChange = vi.fn();
			render(DateRangePicker, { onRangeChange });
			
			const input = screen.getByRole("textbox");
			await fireEvent.focus(input);
			
			// Select start date (20th)
			const startDate = screen.getByLabelText(new RegExp("20"));
			await fireEvent.click(startDate);
			
			// Select earlier date (15th) as end
			const endDate = screen.getByLabelText(new RegExp("15"));
			await fireEvent.click(endDate);
			
			// Should swap the dates
			const lastCall = onRangeChange.mock.calls[onRangeChange.mock.calls.length - 1][0];
			expect(lastCall.from.getDate()).toBe(15);
			expect(lastCall.to.getDate()).toBe(20);
		});

		it("clears range when clear button is clicked", async () => {
			const onRangeChange = vi.fn();
			const from = new Date(2024, 0, 15);
			const to = new Date(2024, 0, 20);
			
			render(DateRangePicker, { 
				value: { from, to },
				onRangeChange 
			});
			
			const input = screen.getByRole("textbox");
			await fireEvent.focus(input);
			
			const clearButton = screen.getByText("Clear");
			await fireEvent.click(clearButton);
			
			expect(onRangeChange).toHaveBeenCalledWith({
				from: null,
				to: null
			});
		});

		it("applies custom separator", () => {
			const from = new Date(2024, 0, 15);
			const to = new Date(2024, 0, 20);
			render(DateRangePicker, { 
				value: { from, to },
				separator: " to "
			});
			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("01/15/2024 to 01/20/2024");
		});
	});
});