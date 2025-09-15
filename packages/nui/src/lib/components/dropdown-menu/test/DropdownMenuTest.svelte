<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel,
	} from "../index.js";

	let { position = "bottom", hover = false, onOpenChange = () => {} } = $props();
</script>

<DropdownMenu {position} {hover} {onOpenChange}>
	<DropdownMenuTrigger>Menu Trigger</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>Actions</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuItem>Item 1</DropdownMenuItem>
		<DropdownMenuItem>Item 2</DropdownMenuItem>
		<DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem destructive>Delete</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>