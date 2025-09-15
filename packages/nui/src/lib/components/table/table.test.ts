import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "./index.js";

describe("Table Components", () => {
	it("renders table with all components", () => {
		const { container } = render(Table, {
			props: {
				children: () => [
					TableCaption({ children: () => "Test Caption" }),
					TableHeader({
						children: () => TableRow({
							children: () => [
								TableHead({ children: () => "Name" }),
								TableHead({ children: () => "Email" })
							]
						})
					}),
					TableBody({
						children: () => TableRow({
							children: () => [
								TableCell({ children: () => "John Doe" }),
								TableCell({ children: () => "john@example.com" })
							]
						})
					})
				]
			}
		});

		const table = container.querySelector('[data-slot="table"]');
		expect(table).toBeInTheDocument();
		expect(table).toHaveClass("table", "w-full");
	});

	it("applies variant classes correctly", () => {
		const { container } = render(Table, {
			props: { variant: "zebra" }
		});

		const table = container.querySelector('[data-slot="table"]');
		expect(table).toHaveClass("table-zebra");
	});

	it("applies size classes correctly", () => {
		const { container } = render(Table, {
			props: { size: "sm" }
		});

		const table = container.querySelector('[data-slot="table"]');
		expect(table).toHaveClass("table-sm");
	});

	it("renders table row with selection state", () => {
		const { container } = render(TableRow, {
			props: { selected: true }
		});

		const row = container.querySelector('[data-slot="table-row"]');
		expect(row).toHaveAttribute("data-state", "selected");
	});

	it("renders table cell as header when header prop is true", () => {
		const { container } = render(TableCell, {
			props: { header: true, children: () => "Header Cell" }
		});

		expect(container.querySelector("th")).toBeInTheDocument();
		expect(container.querySelector("td")).not.toBeInTheDocument();
	});
});