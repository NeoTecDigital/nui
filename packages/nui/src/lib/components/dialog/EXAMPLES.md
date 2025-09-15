# Dialog Components Examples

This document demonstrates how to use the complete modal and dialog component system with shadcn-svelte API compatibility and daisyUI styling.

## Basic Dialog

```svelte
<script>
  import * as Dialog from "$lib/components/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger>Edit Profile</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="name" class="text-right">Name</label>
        <input id="name" value="Pedro Duarte" class="input input-bordered col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <label for="username" class="text-right">Username</label>
        <input id="username" value="@peduarte" class="input input-bordered col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <button type="submit" class="btn btn-primary">Save changes</button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

## Controlled Dialog

```svelte
<script>
  import * as Dialog from "$lib/components/dialog";
  
  let open = $state(false);
  
  function handleSave() {
    // Perform save operation
    console.log("Saving...");
    open = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>Open Controlled Dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Controlled Dialog</Dialog.Title>
      <Dialog.Description>
        This dialog's state is controlled by the parent component.
      </Dialog.Description>
    </Dialog.Header>
    <div class="py-4">
      <p>Dialog content...</p>
    </div>
    <Dialog.Footer>
      <button onclick={handleSave} class="btn btn-primary">Save</button>
      <button onclick={() => open = false} class="btn btn-outline">Cancel</button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

## Alert Dialog

```svelte
<script>
  import * as AlertDialog from "$lib/components/alert-dialog";
  
  function deleteAccount() {
    // Perform delete operation
    console.log("Account deleted");
  }
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class="btn btn-error">Delete Account</AlertDialog.Trigger>
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
      <AlertDialog.Action onclick={deleteAccount} class="btn btn-error">
        Yes, delete account
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

## Sheet (Slide-in Panel)

```svelte
<script>
  import * as Sheet from "$lib/components/sheet";
</script>

<Sheet.Root side="right">
  <Sheet.Trigger>Open Settings</Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Settings</Sheet.Title>
      <Sheet.Description>
        Configure your application settings here.
      </Sheet.Description>
    </Sheet.Header>
    <div class="py-4 space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Theme</span>
        </label>
        <select class="select select-bordered w-full">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Enable notifications</span>
          <input type="checkbox" class="toggle" checked />
        </label>
      </div>
    </div>
    <Sheet.Footer>
      <button class="btn btn-primary">Save Settings</button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

## Drawer (Side Navigation)

```svelte
<script>
  import * as Drawer from "$lib/components/drawer";
</script>

<Drawer.Root side="left" modal={false}>
  <Drawer.Content>
    <!-- Main content area -->
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <Drawer.Trigger asLabel class="btn btn-square btn-ghost">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </Drawer.Trigger>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
    </div>
    
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">Main content area. Toggle the drawer to see the navigation.</p>
        </div>
      </div>
    </div>
  </Drawer.Content>
  
  <!-- Drawer sidebar content -->
  <aside class="bg-base-200 text-base-content min-h-full w-80 p-4">
    <Drawer.Header>
      <Drawer.Title>Navigation</Drawer.Title>
      <Drawer.Description>Site navigation menu</Drawer.Description>
    </Drawer.Header>
    
    <ul class="menu">
      <li><a>Home</a></li>
      <li><a>About</a></li>
      <li><a>Services</a></li>
      <li><a>Contact</a></li>
    </ul>
  </aside>
</Drawer.Root>
```

## Modal Drawer

```svelte
<script>
  import * as Drawer from "$lib/components/drawer";
</script>

<Drawer.Root side="right" modal={true}>
  <Drawer.Trigger>Open Cart</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Shopping Cart</Drawer.Title>
      <Drawer.Description>Review your items before checkout</Drawer.Description>
    </Drawer.Header>
    
    <div class="flex-1 overflow-y-auto">
      <!-- Cart items -->
      <div class="space-y-4">
        <div class="card card-compact bg-base-100 shadow">
          <div class="card-body">
            <h3 class="card-title">Product 1</h3>
            <p>$29.99</p>
          </div>
        </div>
        <div class="card card-compact bg-base-100 shadow">
          <div class="card-body">
            <h3 class="card-title">Product 2</h3>
            <p>$39.99</p>
          </div>
        </div>
      </div>
    </div>
    
    <Drawer.Footer>
      <div class="w-full space-y-2">
        <div class="flex justify-between text-lg font-semibold">
          <span>Total: $69.98</span>
        </div>
        <button class="btn btn-primary w-full">Checkout</button>
      </div>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

## Custom Styling

All components support custom CSS classes through the `class` prop:

```svelte
<Dialog.Root class="custom-dialog">
  <Dialog.Trigger class="btn-custom">Custom Trigger</Dialog.Trigger>
  <Dialog.Content class="modal-box-custom bg-gradient-to-br from-primary to-secondary text-primary-content">
    <Dialog.Header class="border-b border-primary-content/20 pb-4 mb-4">
      <Dialog.Title class="text-2xl font-bold">Custom Styled Dialog</Dialog.Title>
      <Dialog.Description class="text-primary-content/80">
        This dialog has custom styling applied.
      </Dialog.Description>
    </Dialog.Header>
    <div class="py-4">
      <p>Content with custom styling...</p>
    </div>
  </Dialog.Content>
</Dialog.Root>
```

## Accessibility Features

All modal components include:

- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: Escape key handling and tab navigation
- **ARIA Attributes**: Proper labeling and descriptions
- **Screen Reader Support**: Role attributes and live regions

## DaisyUI Integration

The components leverage daisyUI classes:

- **Modal**: Uses `modal`, `modal-box`, `modal-backdrop` classes
- **Drawer**: Uses `drawer`, `drawer-side`, `drawer-content` classes  
- **Buttons**: Supports all daisyUI button variants
- **Theme**: Inherits from daisyUI theme system

## TypeScript Support

All components are fully typed with proper TypeScript definitions:

```typescript
import type { 
  DialogProps, 
  SheetProps, 
  DrawerProps,
  AlertDialogProps 
} from "$lib/components";

// Type-safe component usage
const dialogProps: DialogProps = {
  open: true,
  onOpenChange: (open: boolean) => console.log(open),
  class: "custom-class"
};
```