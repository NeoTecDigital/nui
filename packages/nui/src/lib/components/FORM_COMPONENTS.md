# Form Components

This document provides comprehensive guidance for the NUI form component system, built with DaisyUI foundation and shadcn-svelte API compatibility.

## Overview

The NUI form component system provides a complete set of form controls with:
- **DaisyUI Integration**: Uses native DaisyUI classes for consistent styling
- **shadcn-svelte API Compatibility**: Maintains familiar API patterns
- **Accessibility**: Full ARIA support and keyboard navigation
- **Form Validation**: Built-in error states and validation helpers
- **TypeScript Support**: Complete type safety with proper prop definitions

## Components

### Label
Basic label component for form fields.

```svelte
<script>
	import { Label } from "nui/components";
</script>

<Label required invalid={false} disabled={false}>
	Field Label
</Label>
```

**Props:**
- `required?: boolean` - Shows required indicator (*)
- `invalid?: boolean` - Error state styling
- `disabled?: boolean` - Disabled state styling

### Checkbox
Checkbox input with DaisyUI styling and multiple variants.

```svelte
<script>
	import { Checkbox } from "nui/components";
	
	let checked = false;
</script>

<Checkbox 
	bind:checked 
	size="md" 
	variant="primary"
	indeterminate={false}
	invalid={false}
/>
```

**Props:**
- `checked?: boolean` - Checked state (bindable)
- `indeterminate?: boolean` - Indeterminate state
- `size?: "xs" | "sm" | "md" | "lg"` - Size variant
- `variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"` - Color variant
- `invalid?: boolean` - Error state
- `onCheckedChange?: (checked: boolean) => void` - Change callback

### Radio Group
Radio button group with context-based state management.

```svelte
<script>
	import { RadioGroup, RadioGroupItem, Label } from "nui/components";
	
	let value = "option1";
</script>

<RadioGroup bind:value size="md" variant="primary">
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="option1" />
		<Label>Option 1</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="option2" />
		<Label>Option 2</Label>
	</div>
</RadioGroup>
```

**RadioGroup Props:**
- `value?: string` - Selected value (bindable)
- `name?: string` - Group name (auto-generated if not provided)
- `disabled?: boolean` - Disable entire group
- `invalid?: boolean` - Error state for group
- `size?: "xs" | "sm" | "md" | "lg"` - Size for all items
- `variant?: string` - Color variant for all items
- `onValueChange?: (value: string) => void` - Change callback

**RadioGroupItem Props:**
- `value: string` - Required item value
- `disabled?: boolean` - Disable specific item

### Switch
Toggle switch component.

```svelte
<script>
	import { Switch } from "nui/components";
	
	let checked = false;
</script>

<Switch 
	bind:checked 
	size="md" 
	variant="primary"
	invalid={false}
	onCheckedChange={(checked) => console.log(checked)}
/>
```

**Props:**
- `checked?: boolean` - Checked state (bindable)
- `size?: "xs" | "sm" | "md" | "lg"` - Size variant
- `variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error"` - Color variant
- `invalid?: boolean` - Error state
- `onCheckedChange?: (checked: boolean) => void` - Change callback

### Textarea
Multi-line text input with auto-resize capability.

```svelte
<script>
	import { Textarea } from "nui/components";
	
	let value = "";
</script>

<Textarea 
	bind:value 
	placeholder="Enter text..."
	autoResize={true}
	minRows={3}
	maxRows={10}
	invalid={false}
/>
```

**Props:**
- `value?: string` - Text content (bindable)
- `invalid?: boolean` - Error state
- `autoResize?: boolean` - Auto-resize based on content
- `minRows?: number` - Minimum rows (default: 3)
- `maxRows?: number` - Maximum rows for auto-resize
- Standard HTMLTextareaAttributes

### Select
Two implementations: basic native select and advanced custom dropdown.

#### Basic Select (Native)
```svelte
<script>
	import { Select, SelectItem } from "nui/components";
	
	let value = "";
</script>

<Select bind:value placeholder="Select an option..." invalid={false}>
	<SelectItem value="option1" label="Option 1" />
	<SelectItem value="option2" label="Option 2" />
</Select>
```

#### Advanced Select (Custom Dropdown)
```svelte
<script>
	import { 
		SelectRoot, 
		SelectTrigger, 
		SelectValue, 
		SelectContent, 
		SelectItemAdvanced 
	} from "nui/components";
	
	let value = "";
</script>

<SelectRoot bind:value>
	<SelectTrigger>
		<SelectValue placeholder="Select an option..." />
	</SelectTrigger>
	<SelectContent>
		<SelectItemAdvanced value="option1">Option 1</SelectItemAdvanced>
		<SelectItemAdvanced value="option2">Option 2</SelectItemAdvanced>
	</SelectContent>
</SelectRoot>
```

**SelectRoot Props:**
- `value?: string` - Selected value (bindable)
- `open?: boolean` - Open state (bindable)
- `disabled?: boolean` - Disable select
- `invalid?: boolean` - Error state
- `placeholder?: string` - Placeholder text
- `onValueChange?: (value: string) => void` - Value change callback
- `onOpenChange?: (open: boolean) => void` - Open state callback

## Form Helpers

### FormField
Wrapper component that provides form field context and error handling.

```svelte
<script>
	import { FormField, FormLabel, FormControl, FormMessage } from "nui/components";
	import { Input } from "nui/components";
	
	let value = "";
	let error = "";
</script>

<FormField name="email" required {error} description="Enter your email address">
	<FormLabel>Email</FormLabel>
	<FormControl>
		{#snippet children(props)}
			<Input 
				bind:value 
				type="email" 
				placeholder="email@example.com"
				invalid={!!error}
				{...props}
			/>
		{/snippet}
	</FormControl>
	{#if error}
		<FormMessage>{error}</FormMessage>
	{/if}
</FormField>
```

**FormField Props:**
- `name: string` - Required field name
- `required?: boolean` - Required field indicator
- `disabled?: boolean` - Disable field
- `error?: string` - Error message
- `description?: string` - Help text

### FormControl
Renders form control with proper accessibility attributes.

```svelte
<FormControl>
	{#snippet children(props)}
		<Input {...props} />
	{/snippet}
</FormControl>
```

The `children` snippet receives:
- `id` - Field ID
- `aria-describedby` - Error/description IDs
- `aria-invalid` - Invalid state
- `aria-required` - Required state
- `disabled` - Disabled state
- `required` - Required state
- `invalid` - Invalid state

### FormLabel
Form label that automatically links to the field.

```svelte
<FormLabel>Field Label</FormLabel>
```

### FormMessage
Error or description message component.

```svelte
<!-- Error message -->
<FormMessage>This field is required</FormMessage>

<!-- Description message -->
<FormMessage type="description">This is help text</FormMessage>
```

## Usage Patterns

### Basic Form
```svelte
<script>
	import { 
		FormField, FormLabel, FormControl, FormMessage,
		Input, Checkbox, Switch, Textarea, Select, SelectItem
	} from "nui/components";
	
	let formData = {
		name: "",
		email: "",
		bio: "",
		notifications: false,
		country: ""
	};
	
	let errors = {};
</script>

<form>
	<FormField name="name" required error={errors.name}>
		<FormLabel>Name</FormLabel>
		<FormControl>
			{#snippet children(props)}
				<Input bind:value={formData.name} {...props} />
			{/snippet}
		</FormControl>
		{#if errors.name}
			<FormMessage>{errors.name}</FormMessage>
		{/if}
	</FormField>
	
	<!-- More fields... -->
</form>
```

### Validation Integration
```svelte
<script>
	function validate() {
		const newErrors = {};
		
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}
		
		if (!formData.email.includes("@")) {
			newErrors.email = "Invalid email format";
		}
		
		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}
</script>
```

## Accessibility Features

- **ARIA Labels**: All components include proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Proper focus indicators and tab order
- **Screen Reader Support**: Descriptive labels and state announcements
- **Error Announcement**: Error states are properly communicated

## Styling

All components use DaisyUI classes and can be customized through:

1. **DaisyUI Theme Variables**: Use theme colors and spacing
2. **Utility Classes**: Apply additional Tailwind CSS classes
3. **CSS Custom Properties**: Override specific design tokens
4. **Component Variants**: Use built-in size and color variants

## TypeScript Support

All components include comprehensive TypeScript definitions:

```typescript
import type { ComponentProps } from "svelte";
import type { Checkbox } from "nui/components";

type CheckboxProps = ComponentProps<Checkbox>;
```

## Best Practices

1. **Always use FormField** for complex forms with validation
2. **Provide proper labels** for accessibility
3. **Handle validation consistently** across all form fields
4. **Use appropriate input types** for better UX
5. **Test keyboard navigation** for all form interactions
6. **Provide clear error messages** that help users fix issues
7. **Use disabled states** appropriately for unavailable options