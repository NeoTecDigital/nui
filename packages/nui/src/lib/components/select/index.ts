// Basic select component (native)
import Select from "./select.svelte";
import SelectItem from "./select-item.svelte";

// Advanced select components (custom dropdown)
import SelectRoot from "./select-root.svelte";
import SelectTrigger from "./select-trigger.svelte";
import SelectValue from "./select-value.svelte";
import SelectContent from "./select-content.svelte";
import SelectItemAdvanced from "./select-item-advanced.svelte";

export { 
	Select,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItemAdvanced as SelectItemAdvanced
};

// Default export for basic usage
export default Select;

// Convenient re-exports for shadcn-svelte compatibility
export {
	SelectRoot as Root,
	SelectTrigger as Trigger,
	SelectValue as Value,
	SelectContent as Content,
	SelectItemAdvanced as Item
};