import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Chart from "./chart.svelte";
import ChartContainer from "./chart-container.svelte";
import ChartTooltip from "./chart-tooltip.svelte";
import ChartLegend from "./chart-legend.svelte";

const mockConfig = {
	revenue: {
		label: "Revenue",
		color: "#8884d8",
	},
	profit: {
		label: "Profit", 
		color: "#82ca9d",
	},
};

describe("Chart Components", () => {
	describe("Chart", () => {
		it("renders with default props", () => {
			render(Chart, { config: mockConfig });
			const chart = screen.getByTestId("chart") || document.querySelector('[data-chart]');
			expect(chart).toBeInTheDocument();
		});

		it("applies custom className", () => {
			render(Chart, { 
				config: mockConfig,
				class: "custom-chart"
			});
			const chart = document.querySelector('[data-chart]');
			expect(chart).toHaveClass("custom-chart");
		});

		it("applies size variants", () => {
			render(Chart, { 
				config: mockConfig,
				size: "sm"
			});
			const chart = document.querySelector('[data-chart]');
			expect(chart).toHaveClass("h-40");
		});
	});

	describe("ChartContainer", () => {
		it("renders with default props", () => {
			render(ChartContainer, {});
			const container = document.querySelector('[data-chart-container]');
			expect(container).toBeInTheDocument();
		});

		it("applies custom minHeight", () => {
			render(ChartContainer, { minHeight: 300 });
			const container = document.querySelector('[data-chart-container]');
			expect(container).toHaveStyle({ minHeight: "300px" });
		});
	});

	describe("ChartTooltip", () => {
		it("renders when active with payload", () => {
			const payload = [
				{ name: "Revenue", value: 1000, color: "#8884d8", dataKey: "revenue" }
			];
			
			render(ChartTooltip, { 
				active: true,
				payload,
				label: "January"
			});
			
			const tooltip = document.querySelector('[data-chart-tooltip]');
			expect(tooltip).toBeInTheDocument();
		});

		it("does not render when inactive", () => {
			render(ChartTooltip, { active: false });
			const tooltip = document.querySelector('[data-chart-tooltip]');
			expect(tooltip).not.toBeInTheDocument();
		});

		it("hides label when hideLabel is true", () => {
			const payload = [
				{ name: "Revenue", value: 1000, color: "#8884d8", dataKey: "revenue" }
			];
			
			render(ChartTooltip, { 
				active: true,
				payload,
				label: "January",
				hideLabel: true
			});
			
			expect(screen.queryByText("January")).not.toBeInTheDocument();
		});
	});

	describe("ChartLegend", () => {
		it("renders with payload", () => {
			const payload = [
				{ value: "revenue", color: "#8884d8", dataKey: "revenue" },
				{ value: "profit", color: "#82ca9d", dataKey: "profit" }
			];
			
			render(ChartLegend, { payload });
			const legend = document.querySelector('[data-chart-legend]');
			expect(legend).toBeInTheDocument();
		});

		it("applies alignment variants", () => {
			render(ChartLegend, { 
				payload: [],
				align: "start"
			});
			const legend = document.querySelector('[data-chart-legend]');
			expect(legend).toHaveClass("justify-start");
		});

		it("hides icons when hideIcon is true", () => {
			const payload = [
				{ value: "revenue", color: "#8884d8", dataKey: "revenue" }
			];
			
			render(ChartLegend, { payload, hideIcon: true });
			const icons = document.querySelectorAll('.w-3.h-3');
			expect(icons).toHaveLength(0);
		});
	});
});