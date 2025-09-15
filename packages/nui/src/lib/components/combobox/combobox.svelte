<script lang="ts" module>
	import { cn, generateId, type WithElementRef } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { tv } from "tailwind-variants";

	export const comboboxVariants = tv({
		base: "input input-bordered w-full",
		variants: {
			size: {
				sm: "input-sm",
				md: "input-md",
				lg: "input-lg",
			},
			variant: {
				default: "",
				ghost: "input-ghost",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	});

	export interface ComboboxOption {
		value: string;
		label: string;
		disabled?: boolean;
		data?: any;
	}

	export type ComboboxProps = WithElementRef<HTMLInputAttributes> & {
		value?: string | string[];
		options?: ComboboxOption[];
		placeholder?: string;
		searchPlaceholder?: string;
		size?: "sm" | "md" | "lg";
		variant?: "default" | "ghost";
		multiple?: boolean;
		disabled?: boolean;
		searchable?: boolean;
		clearable?: boolean;
		loading?: boolean;
		noOptionsText?: string;
		maxDisplayed?: number;
		onValueChange?: (value: string | string[]) => void;
		onSearchChange?: (search: string) => void;
		onOpen?: () => void;
		onClose?: () => void;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onMount, tick } from "svelte";

	let {
		class: className,
		value = $bindable(multiple ? [] : ""),
		options = [],
		placeholder = "Select option...",
		searchPlaceholder = "Search...",
		size = "md",
		variant = "default",
		multiple = false,
		disabled = false,
		searchable = true,
		clearable = true,
		loading = false,
		noOptionsText = "No options found",
		maxDisplayed = 100,
		onValueChange,
		onSearchChange,
		onOpen,
		onClose,
		ref = $bindable(null),
		id = generateId("combobox"),
		...restProps
	}: ComboboxProps = $props();

	const dispatch = createEventDispatcher<{
		change: string | string[];
		search: string;
		open: void;
		close: void;
	}>();

	let isOpen = $state(false);
	let searchTerm = $state("");
	let inputRef: HTMLInputElement | null = null;
	let listboxRef: HTMLDivElement | null = null;
	let highlightedIndex = $state(-1);

	// Filtered options based on search
	const filteredOptions = $derived(() => {
		if (!searchable || !searchTerm.trim()) {
			return options.slice(0, maxDisplayed);
		}
		
		const term = searchTerm.toLowerCase();
		return options
			.filter(option => 
				option.label.toLowerCase().includes(term) || 
				option.value.toLowerCase().includes(term)
			)
			.slice(0, maxDisplayed);
	});

	// Selected options for display
	const selectedOptions = $derived(() => {
		if (multiple && Array.isArray(value)) {
			return options.filter(option => value.includes(option.value));
		} else if (!multiple && typeof value === "string") {
			return options.filter(option => option.value === value);
		}
		return [];
	});

	// Display value in input
	const displayValue = $derived(() => {
		if (isOpen && searchable) {
			return searchTerm;
		}
		
		if (multiple && Array.isArray(value)) {
			return value.length > 0 ? `${value.length} selected` : "";
		} else {
			const selected = selectedOptions[0];
			return selected ? selected.label : "";
		}
	});

	// Handle input change
	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		searchTerm = target.value;
		highlightedIndex = -1;
		
		onSearchChange?.(searchTerm);
		dispatch("search", searchTerm);
	}

	// Open dropdown
	function openDropdown() {
		if (disabled) return;
		
		isOpen = true;
		highlightedIndex = -1;
		
		if (searchable) {
			searchTerm = "";
		}
		
		onOpen?.();
		dispatch("open");
		
		tick().then(() => {
			inputRef?.focus();
		});
	}

	// Close dropdown
	function closeDropdown() {
		isOpen = false;
		searchTerm = "";
		highlightedIndex = -1;
		
		onClose?.();
		dispatch("close");
	}

	// Select option
	function selectOption(option: ComboboxOption) {
		if (option.disabled) return;
		
		if (multiple && Array.isArray(value)) {
			const newValue = value.includes(option.value)
				? value.filter(v => v !== option.value)
				: [...value, option.value];
			
			value = newValue;
			onValueChange?.(newValue);
			dispatch("change", newValue);
		} else {
			value = option.value;
			onValueChange?.(option.value);
			dispatch("change", option.value);
			closeDropdown();
		}
	}

	// Remove selected option (multiple mode)
	function removeOption(optionValue: string, event: Event) {
		event.stopPropagation();
		
		if (multiple && Array.isArray(value)) {
			const newValue = value.filter(v => v !== optionValue);
			value = newValue;
			onValueChange?.(newValue);
			dispatch("change", newValue);
		}
	}

	// Clear all selections
	function clearSelection(event: Event) {
		event.stopPropagation();
		
		const newValue = multiple ? [] : "";
		value = newValue;
		onValueChange?.(newValue);
		dispatch("change", newValue);
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				if (!isOpen) {
					openDropdown();
				} else {
					highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
				}
				break;
				
			case "ArrowUp":
				event.preventDefault();
				if (isOpen) {
					highlightedIndex = Math.max(highlightedIndex - 1, -1);
				}
				break;
				
			case "Enter":
				event.preventDefault();
				if (isOpen && highlightedIndex >= 0) {
					selectOption(filteredOptions[highlightedIndex]);
				} else if (!isOpen) {
					openDropdown();
				}
				break;
				
			case "Escape":
				event.preventDefault();
				closeDropdown();
				break;
				
			case "Tab":
				closeDropdown();
				break;
		}
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (
			inputRef && !inputRef.contains(event.target as Node) &&
			listboxRef && !listboxRef.contains(event.target as Node)
		) {
			closeDropdown();
		}
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	// Scroll highlighted option into view
	$effect(() => {
		if (isOpen && highlightedIndex >= 0 && listboxRef) {
			const highlightedElement = listboxRef.children[highlightedIndex] as HTMLElement;
			if (highlightedElement) {
				highlightedElement.scrollIntoView({ 
					block: "nearest", 
					behavior: "smooth" 
				});
			}
		}
	});
</script>

<div class="relative" bind:this={ref}>
	<!-- Input Field -->
	<div class="relative">
		<input
			bind:this={inputRef}
			{id}
			class={cn(
				comboboxVariants({ size, variant }),
				multiple && selectedOptions.length > 0 && "pr-16",
				!multiple && clearable && selectedOptions.length > 0 && "pr-16",
				"pr-8",
				className
			)}
			{placeholder}
			{disabled}
			readonly={!searchable}
			type="text"
			value={displayValue}
			autocomplete="off"
			role="combobox"
			aria-expanded={isOpen}
			aria-haspopup="listbox"
			aria-controls="{id}-listbox"
			aria-activedescendant={highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
			on:input={handleInputChange}
			on:focus={openDropdown}
			on:click={openDropdown}
			on:keydown={handleKeydown}
			{...restProps}
		/>

		<!-- Multiple Selection Tags -->
		{#if multiple && Array.isArray(value) && value.length > 0 && !isOpen}
			<div class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 max-w-[calc(100%-3rem)] overflow-hidden">
				{#each selectedOptions.slice(0, 3) as option}
					<span class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
						{option.label}
						<button
							type="button"
							class="hover:bg-primary/20 rounded-sm p-0.5"
							on:click={(e) => removeOption(option.value, e)}
							aria-label="Remove {option.label}"
						>
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
					</span>
				{/each}
				{#if value.length > 3}
					<span class="text-xs text-base-content/60">+{value.length - 3}</span>
				{/if}
			</div>
		{/if}

		<!-- Clear Button -->
		{#if clearable && selectedOptions.length > 0}
			<button
				type="button"
				class="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-base-200 rounded transition-colors"
				on:click={clearSelection}
				aria-label="Clear selection"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
		{/if}

		<!-- Dropdown Arrow -->
		<button
			type="button"
			class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-base-200 rounded transition-colors"
			on:click={isOpen ? closeDropdown : openDropdown}
			aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
		>
			<svg 
				class="w-4 h-4 transition-transform duration-200"
				class:rotate-180={isOpen}
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>

		<!-- Loading Indicator -->
		{#if loading}
			<div class="absolute right-10 top-1/2 -translate-y-1/2">
				<span class="loading loading-spinner loading-sm"></span>
			</div>
		{/if}
	</div>

	<!-- Dropdown List -->
	{#if isOpen}
		<div
			bind:this={listboxRef}
			{id}="{id}-listbox"
			class="absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-auto"
			role="listbox"
			aria-multiselectable={multiple}
		>
			{#if loading}
				<div class="p-4 text-center text-base-content/60">
					<span class="loading loading-spinner loading-sm"></span>
					<span class="ml-2">Loading...</span>
				</div>
			{:else if filteredOptions.length === 0}
				<div class="p-4 text-center text-base-content/60">
					{noOptionsText}
				</div>
			{:else}
				{#each filteredOptions as option, index}
					{@const isSelected = multiple 
						? Array.isArray(value) && value.includes(option.value)
						: value === option.value}
					{@const isHighlighted = index === highlightedIndex}
					
					<button
						type="button"
						{id}="{id}-option-{index}"
						class="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-base-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						class:bg-base-200={isHighlighted}
						class:bg-primary/10={isSelected}
						class:text-primary={isSelected}
						disabled={option.disabled}
						role="option"
						aria-selected={isSelected}
						on:click={() => selectOption(option)}
					>
						<span class="truncate">{option.label}</span>
						
						{#if isSelected}
							<svg class="w-4 h-4 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						{/if}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>