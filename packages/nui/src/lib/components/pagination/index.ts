import Pagination from "./pagination.svelte";
import PaginationContent from "./pagination-content.svelte";
import PaginationItem from "./pagination-item.svelte";
import PaginationLink from "./pagination-link.svelte";
import PaginationPrevious from "./pagination-previous.svelte";
import PaginationNext from "./pagination-next.svelte";
import PaginationEllipsis from "./pagination-ellipsis.svelte";

export {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
	//
	Pagination as Root,
	PaginationContent as Content,
	PaginationItem as Item,
	PaginationLink as Link,
	PaginationPrevious as Previous,
	PaginationNext as Next,
	PaginationEllipsis as Ellipsis,
};

export { type PaginationProps, type PaginationVariant, paginationVariants } from "./pagination.svelte";
export { type PaginationContentProps } from "./pagination-content.svelte";
export { type PaginationItemProps } from "./pagination-item.svelte";
export { type PaginationLinkProps, type PaginationLinkVariant, paginationLinkVariants } from "./pagination-link.svelte";
export { type PaginationPreviousProps } from "./pagination-previous.svelte";
export { type PaginationNextProps } from "./pagination-next.svelte";
export { type PaginationEllipsisProps } from "./pagination-ellipsis.svelte";