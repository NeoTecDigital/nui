<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";

	export type CommandInputProps = WithElementRef<HTMLInputAttributes> & {
		placeholder?: string;
		onValueChange?: (value: string) => void;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		class: className,
		placeholder = "Type a command or search...",
		value = $bindable(""),
		onValueChange,
		ref = $bindable(null),
		...restProps
	}: CommandInputProps = $props();

	const COMMAND_CONTEXT_KEY = Symbol("command");
	const context = getContext<any>(COMMAND_CONTEXT_KEY);

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = target.value;
		value = newValue;
		
		if (context) {
			context.search = newValue;
		}
		
		onValueChange?.(newValue);
	}
</script>

<div class="flex items-center border-b border-base-300 px-3" data-slot="command-input-wrapper">
	<svg
		class="mr-2 h-4 w-4 shrink-0 opacity-50"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		></path>
	</svg>
	<input
		bind:this={ref}
		data-slot="command-input"
		class={cn(
			"flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-base-content/50 disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{placeholder}
		bind:value
		oninput={handleInput}
		{...restProps}
	/>
</div>