import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import AlertDialogTest from "./AlertDialogTest.svelte";

describe("AlertDialog", () => {
	it("renders alert dialog trigger correctly", () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("opens alert dialog when trigger is clicked", async () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		expect(trigger).toHaveAttribute("aria-expanded", "true");
		
		const dialog = screen.getByRole("alertdialog");
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute("aria-modal", "true");
	});

	it("closes alert dialog when cancel button is clicked", async () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const cancelButton = screen.getByRole("button", { name: /cancel/i });
		await fireEvent.click(cancelButton);
		
		expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("closes alert dialog when action button is clicked", async () => {
		const onAction = vi.fn();
		render(AlertDialogTest, { onAction });
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const actionButton = screen.getByRole("button", { name: /delete/i });
		await fireEvent.click(actionButton);
		
		expect(onAction).toHaveBeenCalled();
		expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
	});

	it("does not close on backdrop click by default", async () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const modal = document.querySelector(".modal");
		expect(modal).toBeInTheDocument();
		
		await fireEvent.click(modal!);
		
		// Alert dialog should still be open
		expect(screen.getByRole("alertdialog")).toBeInTheDocument();
	});

	it("does not close on escape key by default", async () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const dialog = screen.getByRole("alertdialog");
		await fireEvent.keyDown(dialog, { key: "Escape" });
		
		// Alert dialog should still be open
		expect(screen.getByRole("alertdialog")).toBeInTheDocument();
	});

	it("has proper ARIA attributes", async () => {
		render(AlertDialogTest);
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const dialog = screen.getByRole("alertdialog");
		const title = screen.getByText("Are you absolutely sure?");
		const description = screen.getByText(/this action cannot be undone/i);
		
		expect(dialog).toHaveAttribute("aria-labelledby", title.id);
		expect(dialog).toHaveAttribute("aria-describedby", description.id);
	});

	it("prevents action when event is defaultPrevented", async () => {
		const onAction = vi.fn((e) => e.preventDefault());
		render(AlertDialogTest, { onAction });
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		const actionButton = screen.getByRole("button", { name: /delete/i });
		await fireEvent.click(actionButton);
		
		expect(onAction).toHaveBeenCalled();
		// Dialog should still be open because preventDefault was called
		expect(screen.getByRole("alertdialog")).toBeInTheDocument();
	});

	it("supports custom styling", () => {
		render(AlertDialogTest, { class: "custom-alert-dialog" });
		
		const dialogRoot = document.querySelector("[data-slot='alert-dialog-root']");
		expect(dialogRoot).toHaveClass("custom-alert-dialog");
	});

	it("calls onOpenChange when state changes", async () => {
		const onOpenChange = vi.fn();
		render(AlertDialogTest, { onOpenChange });
		
		const trigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(trigger);
		
		expect(onOpenChange).toHaveBeenCalledWith(true);
		
		const cancelButton = screen.getByRole("button", { name: /cancel/i });
		await fireEvent.click(cancelButton);
		
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});
});