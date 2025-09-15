import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DropdownMenuTest from "./test/DropdownMenuTest.svelte";

describe("DropdownMenu", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("renders trigger button", () => {
		render(DropdownMenuTest);
		expect(screen.getByRole("button", { name: /menu trigger/i })).toBeInTheDocument();
	});

	it("opens menu when trigger is clicked", async () => {
		render(DropdownMenuTest);
		const trigger = screen.getByRole("button", { name: /menu trigger/i });
		
		await fireEvent.click(trigger);
		
		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	});

	it("closes menu when clicking outside", async () => {
		render(DropdownMenuTest);
		const trigger = screen.getByRole("button", { name: /menu trigger/i });
		
		await fireEvent.click(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();
		
		await fireEvent.click(document.body);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("handles keyboard navigation", async () => {
		render(DropdownMenuTest);
		const trigger = screen.getByRole("button", { name: /menu trigger/i });
		
		await fireEvent.click(trigger);
		
		// Test arrow down navigation
		await fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });
		expect(screen.getByRole("menuitem", { name: /item 1/i })).toHaveFocus();
		
		// Test escape key
		await fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("calls onOpenChange when menu state changes", async () => {
		const onOpenChange = vi.fn();
		render(DropdownMenuTest, { onOpenChange });
		
		const trigger = screen.getByRole("button", { name: /menu trigger/i });
		await fireEvent.click(trigger);
		
		expect(onOpenChange).toHaveBeenCalledWith(true);
	});

	it("supports different positions", () => {
		render(DropdownMenuTest, { position: "top" });
		const dropdown = screen.getByRole("button").parentElement;
		expect(dropdown).toHaveClass("dropdown-top");
	});

	it("supports hover mode", () => {
		render(DropdownMenuTest, { hover: true });
		const dropdown = screen.getByRole("button").parentElement;
		expect(dropdown).toHaveClass("dropdown-hover");
	});
});