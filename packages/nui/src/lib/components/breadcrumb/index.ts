import Breadcrumb from "./breadcrumb.svelte";
import BreadcrumbList from "./breadcrumb-list.svelte";
import BreadcrumbItem from "./breadcrumb-item.svelte";
import BreadcrumbLink from "./breadcrumb-link.svelte";
import BreadcrumbPage from "./breadcrumb-page.svelte";
import BreadcrumbSeparator from "./breadcrumb-separator.svelte";
import BreadcrumbEllipsis from "./breadcrumb-ellipsis.svelte";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	//
	Breadcrumb as Root,
	BreadcrumbList as List,
	BreadcrumbItem as Item,
	BreadcrumbLink as Link,
	BreadcrumbPage as Page,
	BreadcrumbSeparator as Separator,
	BreadcrumbEllipsis as Ellipsis,
};

export type { BreadcrumbProps } from "./breadcrumb.svelte";
export type { BreadcrumbListProps } from "./breadcrumb-list.svelte";
export type { BreadcrumbItemProps } from "./breadcrumb-item.svelte";
export type { BreadcrumbLinkProps } from "./breadcrumb-link.svelte";
export type { BreadcrumbPageProps } from "./breadcrumb-page.svelte";
export type { BreadcrumbSeparatorProps } from "./breadcrumb-separator.svelte";
export type { BreadcrumbEllipsisProps } from "./breadcrumb-ellipsis.svelte";