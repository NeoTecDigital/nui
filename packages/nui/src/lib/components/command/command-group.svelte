<script lang="ts" module>
	import { cn, type WithElementRef, generateId } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	export type CommandGroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		heading?: string;
	};
</script>

<script lang="ts">
	import { getContext } from "svelte";

	let {
		class: className,
		heading,
		ref = $bindable(null),
		children,
		...restProps
	}: CommandGroupProps = $props();

	const COMMAND_CONTEXT_KEY = Symbol("command");
	const context = getContext<any>(COMMAND_CONTEXT_KEY);
	const groupId = generateId("command-group");

	// Register group with context
	if (context && heading) {
		context.groups.add(heading);
	}
</script>

<div
	bind:this={ref}
	data-slot="command-group"
	class={cn("overflow-hidden p-1 text-base-content", className)}
	role="group"
	aria-labelledby={heading ? `${groupId}-heading` : undefined}
	{...restProps}
>
	{#if heading}
		<div
			id="{groupId}-heading"
			class="px-2 py-1.5 text-xs font-medium text-base-content/70"
			data-slot="command-group-heading"
		>
			{heading}
		</div>
	{/if}
	{@render children?.()}
</div>