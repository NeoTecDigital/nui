import ContextMenu from "./context-menu.svelte";
import ContextMenuTrigger from "./context-menu-trigger.svelte";
import ContextMenuContent from "./context-menu-content.svelte";
import ContextMenuItem from "./context-menu-item.svelte";
import ContextMenuSeparator from "./context-menu-separator.svelte";
import ContextMenuLabel from "./context-menu-label.svelte";

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuLabel,
	//
	ContextMenu as Root,
	ContextMenuTrigger as Trigger,
	ContextMenuContent as Content,
	ContextMenuItem as Item,
	ContextMenuSeparator as Separator,
	ContextMenuLabel as Label,
};

export type { ContextMenuProps } from "./context-menu.svelte";
export type { ContextMenuTriggerProps } from "./context-menu-trigger.svelte";
export type { ContextMenuContentProps } from "./context-menu-content.svelte";
export type { ContextMenuItemProps } from "./context-menu-item.svelte";
export type { ContextMenuSeparatorProps } from "./context-menu-separator.svelte";
export type { ContextMenuLabelProps } from "./context-menu-label.svelte";