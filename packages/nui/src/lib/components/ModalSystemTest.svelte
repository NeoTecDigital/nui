<script lang="ts">
	import * as Dialog from "./dialog/index.js";
	import * as AlertDialog from "./alert-dialog/index.js";
	import * as Sheet from "./sheet/index.js";
	import * as Drawer from "./drawer/index.js";
	
	let { 
		onDialogChange,
		onSheetChange,
		onAlertChange,
		onDrawerChange,
		initialDialogOpen = false,
		initialSheetOpen = false,
		initialAlertOpen = false,
		initialDrawerOpen = false
	}: {
		onDialogChange?: (open: boolean) => void;
		onSheetChange?: (open: boolean) => void;
		onAlertChange?: (open: boolean) => void;
		onDrawerChange?: (open: boolean) => void;
		initialDialogOpen?: boolean;
		initialSheetOpen?: boolean;
		initialAlertOpen?: boolean;
		initialDrawerOpen?: boolean;
	} = $props();
	
	let dialogOpen = $state(initialDialogOpen);
	let sheetOpen = $state(initialSheetOpen);
	let alertOpen = $state(initialAlertOpen);
	let drawerOpen = $state(initialDrawerOpen);
</script>

<div class="p-8 space-y-4">
	<h1 class="text-2xl font-bold">Modal System Test</h1>
	
	<div class="flex gap-4 flex-wrap">
		<!-- Dialog Test -->
		<Dialog.Root bind:open={dialogOpen} onOpenChange={onDialogChange}>
			<Dialog.Trigger class="btn btn-primary">Open Dialog</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-md">
				<Dialog.Header>
					<Dialog.Title>Test Dialog</Dialog.Title>
					<Dialog.Description>
						This is a test dialog for integration testing.
					</Dialog.Description>
				</Dialog.Header>
				<div class="py-4">
					<p>Dialog content for testing focus management and interactions.</p>
					<button class="btn btn-sm btn-outline mt-2">Test Button</button>
				</div>
				<Dialog.Footer>
					<button class="btn btn-primary">Save</button>
					<button class="btn btn-outline">Cancel</button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>

		<!-- Alert Dialog Test -->
		<AlertDialog.Root bind:open={alertOpen} onOpenChange={onAlertChange}>
			<AlertDialog.Trigger class="btn btn-error">Delete Account</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your account.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action class="btn btn-error">Delete</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>

		<!-- Sheet Test -->
		<Sheet.Root bind:open={sheetOpen} onOpenChange={onSheetChange} side="right">
			<Sheet.Trigger class="btn btn-secondary">Open Sheet</Sheet.Trigger>
			<Sheet.Content data-testid="sheet-content">
				<Sheet.Header>
					<Sheet.Title>Test Sheet</Sheet.Title>
					<Sheet.Description>
						This is a test sheet panel.
					</Sheet.Description>
				</Sheet.Header>
				<div class="py-4">
					<p>Sheet content for testing slide-in functionality.</p>
					<button class="btn btn-sm btn-outline mt-2">Test Button</button>
				</div>
				<Sheet.Footer>
					<button class="btn btn-primary">Apply</button>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>

		<!-- Drawer Test -->
		<Drawer.Root bind:open={drawerOpen} onOpenChange={onDrawerChange} side="left" modal={true}>
			<Drawer.Trigger class="btn btn-accent">Open Drawer</Drawer.Trigger>
			<Drawer.Content data-testid="drawer-content">
				<div class="navbar bg-base-100">
					<div class="navbar-start">
						<span class="text-lg font-semibold">App</span>
					</div>
				</div>
				<div class="hero min-h-screen bg-base-200">
					<div class="hero-content text-center">
						<div class="max-w-md">
							<h1 class="text-3xl font-bold">Main Content</h1>
							<p class="py-6">This is the main content area.</p>
						</div>
					</div>
				</div>
			</Drawer.Content>
			
			<!-- Drawer sidebar -->
			<aside class="bg-base-200 text-base-content min-h-full w-80 p-4">
				<Drawer.Header>
					<Drawer.Title>Navigation</Drawer.Title>
					<Drawer.Description>Test drawer navigation</Drawer.Description>
				</Drawer.Header>
				<ul class="menu">
					<li><a href="#home">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
				<Drawer.Footer>
					<button class="btn btn-sm">Settings</button>
				</Drawer.Footer>
			</aside>
		</Drawer.Root>
	</div>

	<!-- Status indicators for testing -->
	<div class="mt-8 p-4 bg-base-200 rounded-lg">
		<h2 class="text-lg font-semibold mb-2">Modal States:</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
			<div>Dialog: {dialogOpen ? 'Open' : 'Closed'}</div>
			<div>Alert: {alertOpen ? 'Open' : 'Closed'}</div>
			<div>Sheet: {sheetOpen ? 'Open' : 'Closed'}</div>
			<div>Drawer: {drawerOpen ? 'Open' : 'Closed'}</div>
		</div>
	</div>
</div>