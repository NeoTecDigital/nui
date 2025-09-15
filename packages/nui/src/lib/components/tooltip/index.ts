import Root from "./tooltip.svelte";
import Trigger from "./tooltip-trigger.svelte";
import Content from "./tooltip-content.svelte";
import Provider from "./tooltip-provider.svelte";

export {
	Root,
	Trigger,
	Content,
	Provider,
	//
	Root as Tooltip,
	Trigger as TooltipTrigger,
	Content as TooltipContent,
	Provider as TooltipProvider,
};

export type { TooltipProps } from "./tooltip.svelte";
export type { TooltipTriggerProps } from "./tooltip-trigger.svelte";
export type { TooltipContentProps } from "./tooltip-content.svelte";
export type { TooltipProviderProps } from "./tooltip-provider.svelte";