import Command from "./command.svelte";
import CommandInput from "./command-input.svelte";
import CommandList from "./command-list.svelte";
import CommandEmpty from "./command-empty.svelte";
import CommandGroup from "./command-group.svelte";
import CommandItem from "./command-item.svelte";
import CommandSeparator from "./command-separator.svelte";
import CommandShortcut from "./command-shortcut.svelte";

export {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandShortcut,
	//
	Command as Root,
	CommandInput as Input,
	CommandList as List,
	CommandEmpty as Empty,
	CommandGroup as Group,
	CommandItem as Item,
	CommandSeparator as Separator,
	CommandShortcut as Shortcut,
};

export { type CommandProps, type CommandVariant, commandVariants } from "./command.svelte";
export { type CommandInputProps } from "./command-input.svelte";
export { type CommandListProps } from "./command-list.svelte";
export { type CommandEmptyProps } from "./command-empty.svelte";
export { type CommandGroupProps } from "./command-group.svelte";
export { type CommandItemProps, type CommandItemVariant, commandItemVariants } from "./command-item.svelte";
export { type CommandSeparatorProps } from "./command-separator.svelte";
export { type CommandShortcutProps } from "./command-shortcut.svelte";