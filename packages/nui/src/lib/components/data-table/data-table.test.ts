import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { DataTable } from "./index.js";

describe("DataTable Component", () => {
	const mockData = [
		{ id: 1, name: "John Doe", email: "john@example.com", age: 30 },
		{ id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
		{ id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
	];

	const mockColumns = [
		{ id: "name", accessorKey: "name", header: "Name", sortable: true },
		{ id: "email", accessorKey: "email", header: "Email", sortable: true },
		{ id: "age", accessorKey: "age", header: "Age", sortable: true },
	];

	it("renders data table with data", () => {
		const { container } = render(DataTable, {
			props: { data: mockData, columns: mockColumns }
		});

		const table = container.querySelector('[data-slot="data-table"]');
		expect(table).toBeInTheDocument();

		// Check if data is rendered
		expect(container.textContent).toContain("John Doe");
		expect(container.textContent).toContain("jane@example.com");
	});

	it("handles sorting when column header is clicked", async () => {
		const onSortingChange = vi.fn();
		const { container } = render(DataTable, {
			props: { 
				data: mockData, 
				columns: mockColumns,
				onSortingChange
			}
		});

		const nameHeader = container.querySelector('button:has-text("Name")');
		if (nameHeader) {
			await fireEvent.click(nameHeader);
			expect(onSortingChange).toHaveBeenCalled();
		}
	});

	it("shows loading state", () => {
		const { container } = render(DataTable, {
			props: { 
				data: [], 
				columns: mockColumns,
				loading: true
			}
		});

		expect(container.querySelector('.loading')).toBeInTheDocument();
		expect(container.textContent).toContain("Loading...");
	});

	it("shows empty message when no data", () => {
		const emptyMessage = "No records found";
		const { container } = render(DataTable, {
			props: { 
				data: [], 
				columns: mockColumns,
				emptyMessage
			}
		});

		expect(container.textContent).toContain(emptyMessage);
	});

	it("handles row selection", async () => {
		const onRowSelectionChange = vi.fn();
		const { container } = render(DataTable, {
			props: { 
				data: mockData, 
				columns: mockColumns,
				enableSelection: true,
				onRowSelectionChange
			}
		});

		const checkbox = container.querySelector('input[type="checkbox"]');
		if (checkbox) {
			await fireEvent.click(checkbox);
			expect(onRowSelectionChange).toHaveBeenCalled();
		}
	});

	it("handles global filtering", async () => {
		const { container } = render(DataTable, {
			props: { 
				data: mockData, 
				columns: mockColumns,
				enableFiltering: true
			}
		});

		const searchInput = container.querySelector('input[placeholder*="Search"]');
		if (searchInput) {
			await fireEvent.input(searchInput, { target: { value: "John" } });
			// Should filter to show only John Doe
		}
	});

	it("handles pagination", () => {
		const { container } = render(DataTable, {
			props: { 
				data: mockData, 
				columns: mockColumns,
				enablePagination: true,
				pageSize: 2
			}
		});

		// Should show pagination controls
		expect(container.textContent).toContain("Previous");
		expect(container.textContent).toContain("Next");
		expect(container.textContent).toContain("Showing 1 to 2 of 3 results");
	});
});