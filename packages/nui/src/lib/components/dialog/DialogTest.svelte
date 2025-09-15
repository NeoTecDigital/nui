<script lang="ts">
	import * as Dialog from "./index.js";
	
	let { 
		open = $bindable(false),
		onOpenChange,
		class: className = ""
	}: {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		class?: string;
	} = $props();
</script>

<Dialog.Root bind:open {onOpenChange} class={className}>
	<Dialog.Trigger>Open Dialog</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Dialog Title</Dialog.Title>
			<Dialog.Description>
				This is a dialog description
			</Dialog.Description>
		</Dialog.Header>
		
		<div class="py-4">
			<p>Dialog content goes here</p>
		</div>
		
		<Dialog.Footer>
			<button class="btn btn-primary">Save</button>
			<button class="btn btn-outline">Cancel</button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>