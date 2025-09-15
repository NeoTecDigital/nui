import Sheet from "./sheet.svelte";
import SheetContent from "./sheet-content.svelte";
import SheetDescription from "./sheet-description.svelte";
import SheetFooter from "./sheet-footer.svelte";
import SheetHeader from "./sheet-header.svelte";
import SheetTitle from "./sheet-title.svelte";
import SheetTrigger from "./sheet-trigger.svelte";

export {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	//
	Sheet as Root,
	SheetContent as Content,
	SheetDescription as Description,
	SheetFooter as Footer,
	SheetHeader as Header,
	SheetTitle as Title,
	SheetTrigger as Trigger,
};

export type { SheetProps, SheetSide } from "./sheet.svelte";
export type { SheetContentProps } from "./sheet-content.svelte";
export type { SheetDescriptionProps } from "./sheet-description.svelte";
export type { SheetFooterProps } from "./sheet-footer.svelte";
export type { SheetHeaderProps } from "./sheet-header.svelte";
export type { SheetTitleProps } from "./sheet-title.svelte";
export type { SheetTriggerProps } from "./sheet-trigger.svelte";