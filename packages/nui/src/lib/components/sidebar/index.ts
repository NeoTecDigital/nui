import Sidebar from "./sidebar.svelte";
import SidebarHeader from "./sidebar-header.svelte";
import SidebarContent from "./sidebar-content.svelte";
import SidebarFooter from "./sidebar-footer.svelte";
import SidebarTrigger from "./sidebar-trigger.svelte";

export {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarTrigger,
	//
	Sidebar as Root,
	SidebarHeader as Header,
	SidebarContent as Content,
	SidebarFooter as Footer,
	SidebarTrigger as Trigger,
	type SidebarProps,
	sidebarVariants,
} from "./sidebar.svelte";

export {
	type SidebarHeaderProps,
	sidebarHeaderVariants,
} from "./sidebar-header.svelte";

export {
	type SidebarContentProps,
	sidebarContentVariants,
} from "./sidebar-content.svelte";

export {
	type SidebarFooterProps,
	sidebarFooterVariants,
} from "./sidebar-footer.svelte";

export {
	type SidebarTriggerProps,
	sidebarTriggerVariants,
} from "./sidebar-trigger.svelte";

export default Sidebar;