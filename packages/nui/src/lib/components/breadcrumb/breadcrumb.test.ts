import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import BreadcrumbTest from "./test/BreadcrumbTest.svelte";

describe("Breadcrumb", () => {
	it("renders breadcrumb navigation", () => {
		render(BreadcrumbTest);
		expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
	});

	it("renders breadcrumb items", () => {
		render(BreadcrumbTest);
		expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
		expect(screen.getByText(/current page/i)).toBeInTheDocument();
	});

	it("marks current page correctly", () => {
		render(BreadcrumbTest);
		const currentPage = screen.getByText(/current page/i);
		expect(currentPage).toHaveAttribute("aria-current", "page");
	});

	it("renders separators", () => {
		render(BreadcrumbTest);
		const separators = screen.getAllByRole("presentation");
		expect(separators).toHaveLength(2); // Two separators between three items
	});

	it("supports different sizes", () => {
		render(BreadcrumbTest, { size: "lg" });
		const breadcrumb = screen.getByRole("navigation");
		expect(breadcrumb).toHaveClass("text-lg");
	});
});