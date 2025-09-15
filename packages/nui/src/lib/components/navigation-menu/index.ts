import NavigationMenu from "./navigation-menu.svelte";
import NavigationMenuList from "./navigation-menu-list.svelte";
import NavigationMenuItem from "./navigation-menu-item.svelte";
import NavigationMenuTrigger from "./navigation-menu-trigger.svelte";
import NavigationMenuContent from "./navigation-menu-content.svelte";
import NavigationMenuLink from "./navigation-menu-link.svelte";

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	//
	NavigationMenu as Root,
	NavigationMenuList as List,
	NavigationMenuItem as Item,
	NavigationMenuTrigger as Trigger,
	NavigationMenuContent as Content,
	NavigationMenuLink as Link,
};

export type { NavigationMenuProps } from "./navigation-menu.svelte";
export type { NavigationMenuListProps } from "./navigation-menu-list.svelte";
export type { NavigationMenuItemProps } from "./navigation-menu-item.svelte";
export type { NavigationMenuTriggerProps } from "./navigation-menu-trigger.svelte";
export type { NavigationMenuContentProps } from "./navigation-menu-content.svelte";
export type { NavigationMenuLinkProps } from "./navigation-menu-link.svelte";