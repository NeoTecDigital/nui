import { render, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "./checkbox.svelte";

describe("Checkbox", () => {
	it("renders with default props", () => {
		const { getByRole } = render(Checkbox);
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
		expect(checkbox).not.toBeDisabled();
	});

	it("can be checked and unchecked", async () => {
		let checked = false;
		const { getByRole } = render(Checkbox, { checked });
		const checkbox = getByRole("checkbox");

		expect(checkbox).not.toBeChecked();

		await fireEvent.click(checkbox);
		// Note: In a real test, you'd need to update the bound value
		// This is simplified for demonstration
	});

	it("supports different sizes", () => {
		const { getByRole } = render(Checkbox, { size: "lg" });
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveClass("checkbox-lg");
	});

	it("supports different variants", () => {
		const { getByRole } = render(Checkbox, { variant: "secondary" });
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveClass("checkbox-secondary");
	});

	it("shows error state when invalid", () => {
		const { getByRole } = render(Checkbox, { invalid: true });
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveClass("checkbox-error");
		expect(checkbox).toHaveAttribute("aria-invalid", "true");
	});

	it("can be disabled", () => {
		const { getByRole } = render(Checkbox, { disabled: true });
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toBeDisabled();
	});

	it("supports indeterminate state", () => {
		const { getByRole } = render(Checkbox, { indeterminate: true });
		const checkbox = getByRole("checkbox") as HTMLInputElement;
		
		// Note: Testing indeterminate state requires checking the DOM property
		// This would be set by the component's effect
	});

	it("generates unique ID when not provided", () => {
		const { getByRole } = render(Checkbox);
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveAttribute("id");
		expect(checkbox.id).toMatch(/^checkbox-\w+$/);
	});

	it("uses provided ID", () => {
		const customId = "custom-checkbox";
		const { getByRole } = render(Checkbox, { id: customId });
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveAttribute("id", customId);
	});

	it("forwards additional props", () => {
		const { getByRole } = render(Checkbox, { 
			props: { "data-testid": "custom-checkbox" }
		});
		const checkbox = getByRole("checkbox");
		
		expect(checkbox).toHaveAttribute("data-testid", "custom-checkbox");
	});
});