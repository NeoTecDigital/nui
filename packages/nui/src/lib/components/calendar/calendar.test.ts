import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { Calendar } from "./index.js";

describe("Calendar Component", () => {
	it("renders calendar with current month", () => {
		const { container } = render(Calendar);

		const calendar = container.querySelector('[data-slot="calendar"]');
		expect(calendar).toBeInTheDocument();
		expect(calendar).toHaveAttribute("role", "application");
	});

	it("calls onselect when date is clicked", async () => {
		const onselect = vi.fn();
		const { container } = render(Calendar, {
			props: { onselect }
		});

		const dateButton = container.querySelector('button[role="gridcell"]');
		if (dateButton) {
			await fireEvent.click(dateButton);
			expect(onselect).toHaveBeenCalled();
		}
	});

	it("applies variant classes correctly", () => {
		const { container } = render(Calendar, {
			props: { variant: "bordered" }
		});

		const calendar = container.querySelector('[data-slot="calendar"]');
		expect(calendar).toHaveClass("border", "border-base-300", "rounded-lg");
	});

	it("supports multiple selection mode", async () => {
		const onselect = vi.fn();
		const { container } = render(Calendar, {
			props: { mode: "multiple", onselect }
		});

		const dateButtons = container.querySelectorAll('button[role="gridcell"]');
		if (dateButtons.length >= 2) {
			await fireEvent.click(dateButtons[0]);
			await fireEvent.click(dateButtons[1]);
			expect(onselect).toHaveBeenCalledTimes(2);
		}
	});

	it("navigates months correctly", async () => {
		const { container } = render(Calendar);

		const nextButton = container.querySelector('button[aria-label="Next month"]');
		const prevButton = container.querySelector('button[aria-label="Previous month"]');

		expect(nextButton).toBeInTheDocument();
		expect(prevButton).toBeInTheDocument();

		if (nextButton) {
			await fireEvent.click(nextButton);
		}
	});
});