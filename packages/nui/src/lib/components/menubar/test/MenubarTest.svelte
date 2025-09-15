<script lang="ts">
	import {
		Menubar,
		MenubarMenu,
		MenubarTrigger,
		MenubarContent,
		MenubarItem,
		MenubarSeparator,
	} from "../index.js";

	let { size = "default", onValueChange = () => {} } = $props();
</script>

<Menubar {size} {onValueChange}>
	<MenubarMenu value="file">
		<MenubarTrigger>File</MenubarTrigger>
		<MenubarContent>
			<MenubarItem>New File</MenubarItem>
			<MenubarItem>Open File</MenubarItem>
			<MenubarSeparator />
			<MenubarItem>Save</MenubarItem>
			<MenubarItem>Save As</MenubarItem>
			<MenubarSeparator />
			<MenubarItem>Exit</MenubarItem>
		</MenubarContent>
	</MenubarMenu>
	<MenubarMenu value="edit">
		<MenubarTrigger>Edit</MenubarTrigger>
		<MenubarContent>
			<MenubarItem>Undo</MenubarItem>
			<MenubarItem>Redo</MenubarItem>
			<MenubarSeparator />
			<MenubarItem>Cut</MenubarItem>
			<MenubarItem>Copy</MenubarItem>
			<MenubarItem>Paste</MenubarItem>
		</MenubarContent>
	</MenubarMenu>
	<MenubarMenu value="view">
		<MenubarTrigger>View</MenubarTrigger>
		<MenubarContent>
			<MenubarItem>Zoom In</MenubarItem>
			<MenubarItem>Zoom Out</MenubarItem>
			<MenubarItem>Reset Zoom</MenubarItem>
		</MenubarContent>
	</MenubarMenu>
</Menubar>