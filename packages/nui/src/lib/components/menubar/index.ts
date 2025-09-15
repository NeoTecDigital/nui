import Menubar from "./menubar.svelte";
import MenubarMenu from "./menubar-menu.svelte";
import MenubarTrigger from "./menubar-trigger.svelte";
import MenubarContent from "./menubar-content.svelte";
import MenubarItem from "./menubar-item.svelte";
import MenubarSeparator from "./menubar-separator.svelte";

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	//
	Menubar as Root,
	MenubarMenu as Menu,
	MenubarTrigger as Trigger,
	MenubarContent as Content,
	MenubarItem as Item,
	MenubarSeparator as Separator,
};

export type { MenubarProps } from "./menubar.svelte";
export type { MenubarMenuProps } from "./menubar-menu.svelte";
export type { MenubarTriggerProps } from "./menubar-trigger.svelte";
export type { MenubarContentProps } from "./menubar-content.svelte";
export type { MenubarItemProps } from "./menubar-item.svelte";
export type { MenubarSeparatorProps } from "./menubar-separator.svelte";