<script lang="ts">
	import {
		ContextMenu,
		ContextMenuTrigger,
		ContextMenuContent,
		ContextMenuItem,
		ContextMenuSeparator,
		ContextMenuLabel,
	} from "../index.js";

	let { onOpenChange = () => {} } = $props();
</script>

<ContextMenu {onOpenChange}>
	<ContextMenuTrigger>
		<div class="p-4 border border-dashed border-base-300 rounded-lg text-center">
			Right click me
		</div>
	</ContextMenuTrigger>
	<ContextMenuContent>
		<ContextMenuLabel>Actions</ContextMenuLabel>
		<ContextMenuSeparator />
		<ContextMenuItem>Copy</ContextMenuItem>
		<ContextMenuItem>Paste</ContextMenuItem>
		<ContextMenuItem>Cut</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem destructive>Delete</ContextMenuItem>
	</ContextMenuContent>
</ContextMenu>