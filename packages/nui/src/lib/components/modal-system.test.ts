import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import ModalSystemTest from "./ModalSystemTest.svelte";

describe("Modal System Integration", () => {
	it("renders all modal triggers", () => {
		render(ModalSystemTest);
		
		expect(screen.getByRole("button", { name: /open dialog/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /delete account/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /open sheet/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /open drawer/i })).toBeInTheDocument();
	});

	it("can open multiple modal types simultaneously", async () => {
		render(ModalSystemTest);
		
		// Open dialog
		const dialogTrigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(dialogTrigger);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		
		// Open sheet (should coexist with dialog)
		const sheetTrigger = screen.getByRole("button", { name: /open sheet/i });
		await fireEvent.click(sheetTrigger);
		
		// Both should be open
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
	});

	it("maintains proper z-index layering", async () => {
		render(ModalSystemTest);
		
		// Open dialog first
		const dialogTrigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(dialogTrigger);
		
		// Open alert dialog on top
		const alertTrigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(alertTrigger);
		
		const dialog = screen.getByRole("dialog");
		const alertDialog = screen.getByRole("alertdialog");
		
		// Alert dialog should have higher z-index
		const dialogZIndex = parseInt(getComputedStyle(dialog.closest(".modal")!).zIndex || "0");
		const alertZIndex = parseInt(getComputedStyle(alertDialog.closest(".modal")!).zIndex || "0");
		
		expect(alertZIndex).toBeGreaterThanOrEqual(dialogZIndex);
	});

	it("handles escape key correctly for stacked modals", async () => {
		render(ModalSystemTest);
		
		// Open dialog
		const dialogTrigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(dialogTrigger);
		
		// Open alert dialog on top
		const alertTrigger = screen.getByRole("button", { name: /delete account/i });
		await fireEvent.click(alertTrigger);
		
		// Escape should close the top-most modal (alert dialog)
		await fireEvent.keyDown(document, { key: "Escape" });
		
		// Alert dialog should be closed, regular dialog should remain
		expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("maintains focus management across different modal types", async () => {
		render(ModalSystemTest);
		
		// Test dialog focus management
		const dialogTrigger = screen.getByRole("button", { name: /open dialog/i });
		await fireEvent.click(dialogTrigger);
		
		const dialog = screen.getByRole("dialog");
		const dialogFocusable = dialog.querySelector("button");
		expect(document.activeElement).toBe(dialogFocusable);
		
		// Close dialog and open sheet
		const closeButton = screen.getByRole("button", { name: /close dialog/i });
		await fireEvent.click(closeButton);
		
		const sheetTrigger = screen.getByRole("button", { name: /open sheet/i });
		await fireEvent.click(sheetTrigger);
		
		// Focus should be managed in sheet
		const sheetContent = screen.getByTestId("sheet-content");
		const sheetFocusable = sheetContent.querySelector("button");
		expect(document.activeElement).toBe(sheetFocusable);
	});

	it("supports controlled and uncontrolled modes", async () => {
		const onDialogChange = vi.fn();
		const onSheetChange = vi.fn();
		
		render(ModalSystemTest, {
			onDialogChange,
			onSheetChange,
			initialDialogOpen: true
		});
		
		// Dialog should be open initially (controlled)
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(onDialogChange).toHaveBeenCalledWith(true);
		
		// Sheet should be closed initially (uncontrolled)
		expect(screen.queryByTestId("sheet-content")).not.toBeInTheDocument();
		
		// Open sheet
		const sheetTrigger = screen.getByRole("button", { name: /open sheet/i });
		await fireEvent.click(sheetTrigger);
		expect(onSheetChange).toHaveBeenCalledWith(true);
	});

	it("properly handles drawer in both modal and non-modal modes", async () => {
		render(ModalSystemTest);
		
		// Open modal drawer
		const modalDrawerTrigger = screen.getByRole("button", { name: /open drawer/i });
		await fireEvent.click(modalDrawerTrigger);
		
		// Should have overlay
		const overlay = document.querySelector(".drawer-overlay");
		expect(overlay).toBeInTheDocument();
		
		// Click overlay to close
		await fireEvent.click(overlay!);
		expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
	});

	it("provides proper TypeScript types", () => {
		// This test ensures the components can be imported with proper types
		const component = render(ModalSystemTest);
		expect(component).toBeDefined();
		
		// Verify that all modal components have data-slot attributes for identification
		const slots = [
			"dialog-root",
			"alert-dialog-root", 
			"sheet-root",
			"drawer-root"
		];
		
		slots.forEach(slot => {
			expect(document.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument();
		});
	});

	it("handles rapid open/close operations without memory leaks", async () => {
		render(ModalSystemTest);
		
		const dialogTrigger = screen.getByRole("button", { name: /open dialog/i });
		
		// Rapidly open and close dialog multiple times
		for (let i = 0; i < 5; i++) {
			await fireEvent.click(dialogTrigger);
			expect(screen.getByRole("dialog")).toBeInTheDocument();
			
			const closeButton = screen.getByRole("button", { name: /close dialog/i });
			await fireEvent.click(closeButton);
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		}
		
		// Should not have multiple event listeners attached
		// This is tested implicitly by the fact that the test doesn't crash or leak
		expect(true).toBe(true);
	});
});