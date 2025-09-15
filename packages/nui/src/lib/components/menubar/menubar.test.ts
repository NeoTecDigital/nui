import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import MenubarTest from "./test/MenubarTest.svelte";

describe("Menubar", () => {
	it("renders menubar", () => {
		render(MenubarTest);
		expect(screen.getByRole("menubar")).toBeInTheDocument();
	});

	it("renders menu triggers", () => {
		render(MenubarTest);
		expect(screen.getByRole("menuitem", { name: /file/i })).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /view/i })).toBeInTheDocument();
	});

	it("opens menu when trigger is clicked", async () => {
		render(MenubarTest);
		const fileTrigger = screen.getByRole("menuitem", { name: /file/i });
		
		await fireEvent.click(fileTrigger);
		
		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(fileTrigger).toHaveAttribute("aria-expanded", "true");
	});

	it("supports keyboard navigation between menus", async () => {
		render(MenubarTest);
		const fileTrigger = screen.getByRole("menuitem", { name: /file/i });
		
		await fireEvent.click(fileTrigger);
		
		// Navigate to next menu with arrow key
		await fireEvent.keyDown(screen.getByRole("menubar"), { key: "ArrowRight" });
		
		const editTrigger = screen.getByRole("menuitem", { name: /edit/i });
		expect(editTrigger).toHaveAttribute("aria-expanded", "true");
	});

	it("closes all menus on escape", async () => {
		render(MenubarTest);
		const fileTrigger = screen.getByRole("menuitem", { name: /file/i });
		
		await fireEvent.click(fileTrigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();
		
		await fireEvent.keyDown(screen.getByRole("menubar"), { key: "Escape" });
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("calls onValueChange when menu opens", async () => {
		const onValueChange = vi.fn();
		render(MenubarTest, { onValueChange });
		
		const fileTrigger = screen.getByRole("menuitem", { name: /file/i });
		await fireEvent.click(fileTrigger);
		
		expect(onValueChange).toHaveBeenCalledWith("file");
	});

	it("supports different sizes", () => {
		render(MenubarTest, { size: "lg" });
		const menubar = screen.getByRole("menubar");
		expect(menubar).toHaveClass("min-h-16");
	});
});