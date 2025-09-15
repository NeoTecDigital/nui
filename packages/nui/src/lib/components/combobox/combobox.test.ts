import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Combobox from "./combobox.svelte";

const mockOptions = [
	{ value: "apple", label: "Apple" },
	{ value: "banana", label: "Banana" },
	{ value: "cherry", label: "Cherry" },
	{ value: "date", label: "Date", disabled: true },
	{ value: "elderberry", label: "Elderberry" },
];

describe("Combobox Component", () => {
	it("renders with default props", () => {
		render(Combobox, { options: mockOptions });
		
		const input = screen.getByRole("combobox");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Select option...");
	});

	it("opens dropdown on input focus", async () => {
		render(Combobox, { options: mockOptions });
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		await waitFor(() => {
			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
		
		// Should show all options
		expect(screen.getByText("Apple")).toBeInTheDocument();
		expect(screen.getByText("Banana")).toBeInTheDocument();
	});

	it("opens dropdown on arrow button click", async () => {
		render(Combobox, { options: mockOptions });
		
		const arrowButton = screen.getByLabelText("Open dropdown");
		await fireEvent.click(arrowButton);
		
		await waitFor(() => {
			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
	});

	it("closes dropdown on escape key", async () => {
		render(Combobox, { options: mockOptions });
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		await waitFor(() => {
			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
		
		await fireEvent.keyDown(input, { key: "Escape" });
		
		await waitFor(() => {
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		});
	});

	it("selects option on click", async () => {
		const onValueChange = vi.fn();
		render(Combobox, { 
			options: mockOptions,
			onValueChange 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		const appleOption = screen.getByText("Apple");
		await fireEvent.click(appleOption);
		
		expect(onValueChange).toHaveBeenCalledWith("apple");
		
		// Dropdown should close after selection
		await waitFor(() => {
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		});
	});

	it("filters options when searching", async () => {
		render(Combobox, { 
			options: mockOptions,
			searchable: true 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		// Type search term
		await fireEvent.input(input, { target: { value: "app" } });
		
		await waitFor(() => {
			expect(screen.getByText("Apple")).toBeInTheDocument();
			expect(screen.queryByText("Banana")).not.toBeInTheDocument();
		});
	});

	it("handles keyboard navigation", async () => {
		render(Combobox, { options: mockOptions });
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		// Arrow down should highlight first option
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		
		const appleOption = screen.getByRole("option", { name: /apple/i });
		expect(appleOption).toHaveClass("bg-base-200");
		
		// Enter should select highlighted option
		await fireEvent.keyDown(input, { key: "Enter" });
		
		await waitFor(() => {
			expect(input).toHaveValue("Apple");
		});
	});

	it("supports multiple selection", async () => {
		const onValueChange = vi.fn();
		render(Combobox, { 
			options: mockOptions,
			multiple: true,
			onValueChange 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		// Select first option
		const appleOption = screen.getByText("Apple");
		await fireEvent.click(appleOption);
		
		expect(onValueChange).toHaveBeenCalledWith(["apple"]);
		
		// Dropdown should stay open for multiple selection
		expect(screen.getByRole("listbox")).toBeInTheDocument();
		
		// Select second option
		const bananaOption = screen.getByText("Banana");
		await fireEvent.click(bananaOption);
		
		expect(onValueChange).toHaveBeenCalledWith(["apple", "banana"]);
	});

	it("displays selected count in multiple mode", async () => {
		render(Combobox, { 
			options: mockOptions,
			multiple: true,
			value: ["apple", "banana"] 
		});
		
		const input = screen.getByRole("combobox");
		expect(input).toHaveValue("2 selected");
	});

	it("shows clear button when clearable and has selection", async () => {
		render(Combobox, { 
			options: mockOptions,
			value: "apple",
			clearable: true 
		});
		
		const clearButton = screen.getByLabelText("Clear selection");
		expect(clearButton).toBeInTheDocument();
		
		await fireEvent.click(clearButton);
		
		const input = screen.getByRole("combobox");
		expect(input).toHaveValue("");
	});

	it("respects disabled option state", async () => {
		render(Combobox, { options: mockOptions });
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		const dateOption = screen.getByText("Date");
		expect(dateOption).toBeDisabled();
	});

	it("shows loading state", () => {
		render(Combobox, { 
			options: mockOptions,
			loading: true 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		expect(screen.getByText("Loading...")).toBeInTheDocument();
		expect(screen.getByLabelText("loading")).toBeInTheDocument();
	});

	it("shows no options message when empty", async () => {
		render(Combobox, { 
			options: [],
			noOptionsText: "No fruits found" 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		expect(screen.getByText("No fruits found")).toBeInTheDocument();
	});

	it("applies size variants", () => {
		render(Combobox, { 
			options: mockOptions,
			size: "sm" 
		});
		
		const input = screen.getByRole("combobox");
		expect(input).toHaveClass("input-sm");
	});

	it("applies variant styles", () => {
		render(Combobox, { 
			options: mockOptions,
			variant: "ghost" 
		});
		
		const input = screen.getByRole("combobox");
		expect(input).toHaveClass("input-ghost");
	});

	it("disables interaction when disabled", () => {
		render(Combobox, { 
			options: mockOptions,
			disabled: true 
		});
		
		const input = screen.getByRole("combobox");
		expect(input).toBeDisabled();
	});

	it("dispatches search event when searching", async () => {
		const onSearchChange = vi.fn();
		render(Combobox, { 
			options: mockOptions,
			searchable: true,
			onSearchChange 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "test" } });
		
		expect(onSearchChange).toHaveBeenCalledWith("test");
	});

	it("limits displayed options with maxDisplayed", async () => {
		const manyOptions = Array.from({ length: 20 }, (_, i) => ({
			value: `option-${i}`,
			label: `Option ${i + 1}`
		}));
		
		render(Combobox, { 
			options: manyOptions,
			maxDisplayed: 5 
		});
		
		const input = screen.getByRole("combobox");
		await fireEvent.focus(input);
		
		const optionElements = screen.getAllByRole("option");
		expect(optionElements).toHaveLength(5);
	});
});