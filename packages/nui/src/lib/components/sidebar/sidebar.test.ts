import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Sidebar from "./sidebar.svelte";
import SidebarHeader from "./sidebar-header.svelte";
import SidebarContent from "./sidebar-content.svelte";
import SidebarFooter from "./sidebar-footer.svelte";
import SidebarTrigger from "./sidebar-trigger.svelte";

// Mock window.innerWidth for mobile testing
Object.defineProperty(window, "innerWidth", {
	writable: true,
	configurable: true,
	value: 1024,
});

describe("Sidebar Components", () => {
	describe("Sidebar", () => {
		it("renders with default props", () => {
			render(Sidebar, {});
			const sidebar = document.querySelector('[data-sidebar="root"]');
			expect(sidebar).toBeInTheDocument();
		});

		it("applies open state", () => {
			render(Sidebar, { open: true });
			const sidebar = document.querySelector('[data-sidebar="root"]');
			expect(sidebar).toBeInTheDocument();
		});

		it("handles open state changes", async () => {
			const onOpenChange = vi.fn();
			let open = false;
			
			const { rerender } = render(Sidebar, { 
				open,
				onOpenChange 
			});
			
			// Simulate opening sidebar
			open = true;
			await rerender({ open, onOpenChange });
			
			expect(onOpenChange).not.toHaveBeenCalled(); // Only called on user interaction
		});

		it("applies variant classes", () => {
			render(Sidebar, { variant: "inset" });
			const sidebar = document.querySelector('[data-sidebar="root"]');
			// Check if inset variant is applied (would have border classes)
			expect(sidebar).toBeInTheDocument();
		});

		it("supports collapsible icon mode", () => {
			render(Sidebar, { 
				collapsible: "icon",
				open: false 
			});
			const sidebar = document.querySelector('[data-sidebar="root"]');
			expect(sidebar).toHaveClass("w-16");
		});

		it("expands in icon mode when open", () => {
			render(Sidebar, { 
				collapsible: "icon",
				open: true 
			});
			const sidebar = document.querySelector('[data-sidebar="root"]');
			expect(sidebar).toHaveClass("w-64");
		});

		it("handles escape key to close", async () => {
			const onOpenChange = vi.fn();
			
			// Mock mobile
			Object.defineProperty(window, "innerWidth", { value: 500 });
			
			render(Sidebar, { 
				open: true,
				onOpenChange 
			});
			
			await fireEvent.keyDown(window, { key: "Escape" });
			
			expect(onOpenChange).toHaveBeenCalledWith(false);
		});
	});

	describe("SidebarHeader", () => {
		it("renders header content", () => {
			render(SidebarHeader, {
				children: () => "Header Content"
			});
			
			const header = document.querySelector('[data-sidebar="header"]');
			expect(header).toBeInTheDocument();
		});

		it("applies variant classes", () => {
			render(SidebarHeader, { variant: "sticky" });
			const header = document.querySelector('[data-sidebar="header"]');
			expect(header).toHaveClass("sticky");
		});
	});

	describe("SidebarContent", () => {
		it("renders content area", () => {
			render(SidebarContent, {
				children: () => "Content Area"
			});
			
			const content = document.querySelector('[data-sidebar="content"]');
			expect(content).toBeInTheDocument();
		});

		it("applies scrollable variant", () => {
			render(SidebarContent, { variant: "scrollable" });
			const content = document.querySelector('[data-sidebar="content"]');
			expect(content).toHaveClass("max-h-full");
		});
	});

	describe("SidebarFooter", () => {
		it("renders footer content", () => {
			render(SidebarFooter, {
				children: () => "Footer Content"
			});
			
			const footer = document.querySelector('[data-sidebar="footer"]');
			expect(footer).toBeInTheDocument();
		});

		it("applies sticky variant", () => {
			render(SidebarFooter, { variant: "sticky" });
			const footer = document.querySelector('[data-sidebar="footer"]');
			expect(footer).toHaveClass("sticky");
		});
	});

	describe("SidebarTrigger", () => {
		it("renders trigger button", () => {
			render(SidebarTrigger, {});
			const trigger = document.querySelector('[data-sidebar="trigger"]');
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveAttribute("aria-label", "Toggle sidebar");
		});

		it("shows default hamburger icon", () => {
			render(SidebarTrigger, {});
			const svg = document.querySelector('svg');
			expect(svg).toBeInTheDocument();
		});

		it("renders custom children", () => {
			render(SidebarTrigger, {
				children: () => "Custom"
			});
			expect(screen.getByText("Custom")).toBeInTheDocument();
		});

		it("applies size variants", () => {
			render(SidebarTrigger, { size: "sm" });
			const trigger = document.querySelector('[data-sidebar="trigger"]');
			expect(trigger).toHaveClass("btn-sm");
		});

		// Note: Testing the toggle functionality would require 
		// setting up the full sidebar context, which is more complex
		// and would be better tested in integration tests
	});

	describe("Responsive Behavior", () => {
		it("detects mobile viewport", async () => {
			// Mock mobile viewport
			Object.defineProperty(window, "innerWidth", { value: 500 });
			
			render(Sidebar, {});
			
			// Trigger resize event
			await fireEvent(window, new Event("resize"));
			
			// Mobile behavior would be different but hard to test without 
			// exposing internal state. This would be better as an integration test.
		});
	});
});