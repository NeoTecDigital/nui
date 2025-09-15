import Root from "./collapsible.svelte";
import Trigger from "./collapsible-trigger.svelte";
import Content from "./collapsible-content.svelte";

export {
	Root,
	Trigger,
	Content,
	//
	Root as Collapsible,
	Trigger as CollapsibleTrigger,
	Content as CollapsibleContent,
};

export type { CollapsibleProps } from "./collapsible.svelte";
export type { CollapsibleTriggerProps } from "./collapsible-trigger.svelte";
export type { CollapsibleContentProps } from "./collapsible-content.svelte";