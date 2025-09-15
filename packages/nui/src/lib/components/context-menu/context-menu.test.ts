import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import ContextMenuTest from "./test/ContextMenuTest.svelte";

describe("ContextMenu", () => {
	it("renders trigger element", () => {
		render(ContextMenuTest);
		expect(screen.getByText(/right click me/i)).toBeInTheDocument();
	});

	it("opens context menu on right click", async () => {
		render(ContextMenuTest);
		const trigger = screen.getByText(/right click me/i);
		
		await fireEvent.contextMenu(trigger);
		
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("positions menu correctly", async () => {
		render(ContextMenuTest);
		const trigger = screen.getByText(/right click me/i);
		
		const contextMenuEvent = new MouseEvent("contextmenu", {
			clientX: 100,
			clientY: 200,
			bubbles: true,
		});
		
		await fireEvent(trigger, contextMenuEvent);
		
		const menu = screen.getByRole("menu");
		expect(menu).toHaveStyle({ position: "fixed" });
	});

	it("closes menu on escape key", async () => {
		render(ContextMenuTest);
		const trigger = screen.getByText(/right click me/i);
		
		await fireEvent.contextMenu(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();
		
		await fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("closes menu when clicking outside", async () => {
		render(ContextMenuTest);
		const trigger = screen.getByText(/right click me/i);
		
		await fireEvent.contextMenu(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();
		
		await fireEvent.click(document.body);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("calls onOpenChange when menu state changes", async () => {
		const onOpenChange = vi.fn();
		render(ContextMenuTest, { onOpenChange });
		
		const trigger = screen.getByText(/right click me/i);
		await fireEvent.contextMenu(trigger);
		
		expect(onOpenChange).toHaveBeenCalledWith(true);
	});
});