<script lang="ts">
	import * as AlertDialog from "./index.js";
	
	let { 
		open = $bindable(false),
		onOpenChange,
		onAction,
		class: className = ""
	}: {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		onAction?: (e: MouseEvent) => void;
		class?: string;
	} = $props();
</script>

<AlertDialog.Root bind:open {onOpenChange} class={className}>
	<AlertDialog.Trigger>Delete Account</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account
				and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={onAction}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>