import Table from "./table.svelte";
import TableHeader from "./table-header.svelte";
import TableBody from "./table-body.svelte";
import TableRow from "./table-row.svelte";
import TableHead from "./table-head.svelte";
import TableCell from "./table-cell.svelte";
import TableCaption from "./table-caption.svelte";

export {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
	//
	Table as Root,
	TableHeader as Header,
	TableBody as Body,
	TableRow as Row,
	TableHead as Head,
	TableCell as Cell,
	TableCaption as Caption,
};

export { type TableProps, type TableVariant, type TableSize, tableVariants } from "./table.svelte";
export { type TableHeaderProps } from "./table-header.svelte";
export { type TableBodyProps } from "./table-body.svelte";
export { type TableRowProps, type TableRowVariant, tableRowVariants } from "./table-row.svelte";
export { type TableHeadProps } from "./table-head.svelte";
export { type TableCellProps, tableCellVariants } from "./table-cell.svelte";
export { type TableCaptionProps } from "./table-caption.svelte";