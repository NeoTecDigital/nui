import FormField from "./form-field.svelte";
import FormLabel from "./form-label.svelte";
import FormControl from "./form-control.svelte";
import FormMessage from "./form-message.svelte";

export { FormField, FormLabel, FormControl, FormMessage };

// Convenient re-exports for shadcn-svelte compatibility
export {
	FormField as Field,
	FormLabel as Label,
	FormControl as Control,
	FormMessage as Message,
};