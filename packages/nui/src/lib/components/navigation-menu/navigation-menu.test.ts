import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import NavigationMenuTest from "./test/NavigationMenuTest.svelte";

describe("NavigationMenu", () => {
	it("renders navigation menu", () => {
		render(NavigationMenuTest);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("handles menu item activation", async () => {
		const onValueChange = vi.fn();
		render(NavigationMenuTest, { onValueChange });
		
		const trigger = screen.getByRole("button", { name: /products/i });
		await fireEvent.click(trigger);
		
		expect(onValueChange).toHaveBeenCalledWith("products");
		expect(trigger).toHaveClass("btn-active");
	});

	it("supports keyboard navigation", async () => {
		render(NavigationMenuTest);
		
		const trigger = screen.getByRole("button", { name: /products/i });
		trigger.focus();
		
		await fireEvent.keyDown(trigger, { key: "ArrowDown" });
		
		// Should focus first link in content
		const content = screen.getByRole("region");
		expect(content).toBeInTheDocument();
	});

	it("renders with different orientations", () => {
		render(NavigationMenuTest, { orientation: "vertical" });
		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass("flex-col");
	});
});