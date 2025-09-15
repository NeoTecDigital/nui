import Drawer from "./drawer.svelte";
import DrawerContent from "./drawer-content.svelte";
import DrawerDescription from "./drawer-description.svelte";
import DrawerFooter from "./drawer-footer.svelte";
import DrawerHeader from "./drawer-header.svelte";
import DrawerTitle from "./drawer-title.svelte";
import DrawerTrigger from "./drawer-trigger.svelte";

export {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	//
	Drawer as Root,
	DrawerContent as Content,
	DrawerDescription as Description,
	DrawerFooter as Footer,
	DrawerHeader as Header,
	DrawerTitle as Title,
	DrawerTrigger as Trigger,
};

export type { DrawerProps, DrawerSide } from "./drawer.svelte";
export type { DrawerContentProps } from "./drawer-content.svelte";
export type { DrawerDescriptionProps } from "./drawer-description.svelte";
export type { DrawerFooterProps } from "./drawer-footer.svelte";
export type { DrawerHeaderProps } from "./drawer-header.svelte";
export type { DrawerTitleProps } from "./drawer-title.svelte";
export type { DrawerTriggerProps } from "./drawer-trigger.svelte";