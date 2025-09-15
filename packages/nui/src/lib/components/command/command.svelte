<script lang="ts" module>
	import { cn, type WithElementRef, generateId, trapFocus } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const commandVariants = tv({
		base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-base-100 text-base-content",
		variants: {
			variant: {
				default: "",
				dialog: "border border-base-300 shadow-lg",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CommandVariant = VariantProps<typeof commandVariants>["variant"];

	export interface CommandProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		variant?: CommandVariant;
		filter?: (value: string, search: string) => number;
		shouldFilter?: boolean;
		loop?: boolean;
		label?: string;
		value?: string;
		onValueChange?: (value: string) => void;
	}

	interface CommandContext {
		filter: (value: string, search: string) => number;
		shouldFilter: boolean;
		loop: boolean;
		search: string;
		value: string;
		onValueChange: (value: string) => void;
		items: Map<string, HTMLElement>;
		groups: Set<string>;
	}

	const COMMAND_CONTEXT_KEY = Symbol("command");
</script>

<script lang="ts">
	import { setContext, onMount } from "svelte";

	let {
		class: className,
		variant = "default",
		filter = defaultFilter,
		shouldFilter = true,
		loop = false,
		label = "Command Menu",
		value = "",
		onValueChange,
		ref = $bindable(null),
		children,
		...restProps
	}: CommandProps = $props();

	let searchValue = $state("");

	const context: CommandContext = $state({
		filter,
		shouldFilter,
		loop,
		search: searchValue,
		value,
		onValueChange: onValueChange || (() => {}),
		items: new Map(),
		groups: new Set(),
	});

	setContext(COMMAND_CONTEXT_KEY, context);

	function defaultFilter(value: string, search: string): number {
		if (!search) return 1;
		const searchLower = search.toLowerCase();
		const valueLower = value.toLowerCase();
		
		if (valueLower.includes(searchLower)) {
			return 1;
		}
		return 0;
	}

	function updateValue(newValue: string) {
		context.value = newValue;
		context.onValueChange(newValue);
	}

	function updateSearch(newSearch: string) {
		searchValue = newSearch;
		context.search = newSearch;
	}

	// Focus management
	onMount(() => {
		if (ref) {
			return trapFocus(ref);
		}
	});

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		const { key } = event;
		const items = Array.from(context.items.values()).filter(item => {
			const itemValue = item.getAttribute("data-value") || "";
			const score = context.shouldFilter ? context.filter(itemValue, context.search) : 1;
			return score > 0 && !item.getAttribute("aria-disabled");
		});

		if (items.length === 0) return;

		const currentIndex = items.findIndex(item => item.getAttribute("data-value") === context.value);

		if (key === "ArrowDown" || key === "ArrowUp") {
			event.preventDefault();
			let nextIndex;

			if (key === "ArrowDown") {
				nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : context.loop ? 0 : currentIndex;
			} else {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : context.loop ? items.length - 1 : currentIndex;
			}

			const nextItem = items[nextIndex];
			if (nextItem) {
				const nextValue = nextItem.getAttribute("data-value") || "";
				updateValue(nextValue);
				nextItem.scrollIntoView({ block: "nearest" });
			}
		} else if (key === "Enter") {
			event.preventDefault();
			const selectedItem = items.find(item => item.getAttribute("data-value") === context.value);
			if (selectedItem) {
				selectedItem.click();
			}
		}
	}

	const commandId = generateId("command");
</script>

<div
	bind:this={ref}
	data-slot="command"
	class={cn(commandVariants({ variant }), className)}
	role="combobox"
	aria-expanded="true"
	aria-haspopup="listbox"
	aria-label={label}
	id={commandId}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</div>