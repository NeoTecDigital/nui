import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import DialogTest from "./DialogTest.svelte";

describe("Dialog", () => {
	it("renders dialog trigger correctly", () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("opens dialog when trigger is clicked", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		expect(trigger).toHaveAttribute("aria-expanded", "true");
		
		const dialog = screen.getByRole("dialog");
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute("aria-modal", "true");
	});

	it("closes dialog when close button is clicked", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		const closeButton = screen.getByRole("button", { name: /close dialog/i });
		await fireEvent.click(closeButton);
		
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("closes dialog when escape key is pressed", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		const dialog = screen.getByRole("dialog");
		await fireEvent.keyDown(dialog, { key: "Escape" });
		
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("closes dialog when backdrop is clicked", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		const modal = document.querySelector(".modal");
		expect(modal).toBeInTheDocument();
		
		await fireEvent.click(modal!);
		
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("calls onOpenChange when dialog state changes", async () => {
		const onOpenChange = vi.fn();
		render(DialogTest, { onOpenChange });
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		expect(onOpenChange).toHaveBeenCalledWith(true);
		
		const closeButton = screen.getByRole("button", { name: /close dialog/i });
		await fireEvent.click(closeButton);
		
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("has proper ARIA attributes", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		const dialog = screen.getByRole("dialog");
		const title = screen.getByText("Dialog Title");
		const description = screen.getByText("This is a dialog description");
		
		expect(dialog).toHaveAttribute("aria-labelledby", title.id);
		expect(dialog).toHaveAttribute("aria-describedby", description.id);
	});

	it("traps focus within dialog when open", async () => {
		render(DialogTest);
		
		const trigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(trigger);
		
		const dialog = screen.getByRole("dialog");
		const focusableElements = dialog.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		
		expect(focusableElements.length).toBeGreaterThan(0);
		// The first focusable element should be focused
		expect(document.activeElement).toBe(focusableElements[0]);
	});

	it("supports custom CSS classes", () => {
		render(DialogTest, { class: "custom-dialog" });
		
		const dialogRoot = document.querySelector("[data-slot='dialog-root']");
		expect(dialogRoot).toHaveClass("custom-dialog");
	});

	it("supports controlled open state", async () => {
		const { rerender } = render(DialogTest, { open: false });
		
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		
		await rerender({ open: true });
		
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});
});