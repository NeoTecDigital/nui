import Chart from "./chart.svelte";
import ChartContainer from "./chart-container.svelte";
import ChartTooltip from "./chart-tooltip.svelte";
import ChartLegend from "./chart-legend.svelte";

export {
	Chart,
	ChartContainer,
	ChartTooltip,
	ChartLegend,
	//
	Chart as Root,
	ChartContainer as Container,
	ChartTooltip as Tooltip,
	ChartLegend as Legend,
	type ChartProps,
	type ChartConfig,
	type ChartVariant,
	chartVariants,
} from "./chart.svelte";

export {
	type ChartContainerProps,
} from "./chart-container.svelte";

export {
	type ChartTooltipProps,
	chartTooltipVariants,
} from "./chart-tooltip.svelte";

export {
	type ChartLegendProps,
	chartLegendVariants,
} from "./chart-legend.svelte";

export default Chart;