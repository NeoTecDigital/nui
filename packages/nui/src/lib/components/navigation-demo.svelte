<script lang="ts">
	// Navigation Components Demo
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel,
	} from "./dropdown-menu/index.js";

	import {
		NavigationMenu,
		NavigationMenuList,
		NavigationMenuItem,
		NavigationMenuTrigger,
		NavigationMenuContent,
		NavigationMenuLink,
	} from "./navigation-menu/index.js";

	import {
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbSeparator,
	} from "./breadcrumb/index.js";

	import {
		Menubar,
		MenubarMenu,
		MenubarTrigger,
		MenubarContent,
		MenubarItem,
		MenubarSeparator,
	} from "./menubar/index.js";

	import {
		ContextMenu,
		ContextMenuTrigger,
		ContextMenuContent,
		ContextMenuItem,
		ContextMenuSeparator,
		ContextMenuLabel,
	} from "./context-menu/index.js";
</script>

<div class="p-8 space-y-8">
	<h1 class="text-3xl font-bold">Navigation Components Demo</h1>

	<!-- Breadcrumb -->
	<section>
		<h2 class="text-xl font-semibold mb-4">Breadcrumb</h2>
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/components">Components</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Navigation</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	</section>

	<!-- Navigation Menu -->
	<section>
		<h2 class="text-xl font-semibold mb-4">Navigation Menu</h2>
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem value="home">
					<NavigationMenuLink href="/">Home</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="products">
					<NavigationMenuTrigger>Products</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div class="grid w-[400px] gap-3 p-4">
							<NavigationMenuLink href="/products/widgets">Widgets</NavigationMenuLink>
							<NavigationMenuLink href="/products/gadgets">Gadgets</NavigationMenuLink>
							<NavigationMenuLink href="/products/tools">Tools</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="about">
					<NavigationMenuLink href="/about">About</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</section>

	<!-- Menubar -->
	<section>
		<h2 class="text-xl font-semibold mb-4">Menubar</h2>
		<Menubar>
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
		</Menubar>
	</section>

	<!-- Dropdown Menu -->
	<section>
		<h2 class="text-xl font-semibold mb-4">Dropdown Menu</h2>
		<DropdownMenu>
			<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem destructive>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</section>

	<!-- Context Menu -->
	<section>
		<h2 class="text-xl font-semibold mb-4">Context Menu</h2>
		<ContextMenu>
			<ContextMenuTrigger>
				<div class="p-8 border border-dashed border-base-300 rounded-lg text-center">
					Right-click here to open context menu
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
	</section>
</div>