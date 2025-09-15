import DatePicker from "./date-picker.svelte";
import DateRangePicker from "./date-range-picker.svelte";

export {
	DatePicker,
	DateRangePicker,
	//
	DatePicker as Root,
	DateRangePicker as Range,
	type DatePickerProps,
	datePickerVariants,
} from "./date-picker.svelte";

export {
	type DateRangePickerProps,
	type DateRange,
	dateRangePickerVariants,
} from "./date-range-picker.svelte";

export default DatePicker;