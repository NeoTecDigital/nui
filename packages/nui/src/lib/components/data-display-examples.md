# Data Display Components Examples

This document provides examples of how to use the data display components in the nui library.

## Table Components

### Basic Table
```svelte
<script>
  import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "$lib/components/table";
</script>

<Table variant="zebra" size="md">
  <TableCaption>A list of recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell class="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell class="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Calendar Component

### Basic Calendar
```svelte
<script>
  import { Calendar } from "$lib/components/calendar";
  
  let selectedDate = new Date();
  
  function handleDateSelect(date) {
    selectedDate = date;
    console.log("Selected date:", date);
  }
</script>

<Calendar 
  selected={selectedDate}
  onselect={handleDateSelect}
  variant="bordered"
/>
```

### Multi-Date Selection Calendar
```svelte
<script>
  import { Calendar } from "$lib/components/calendar";
  
  let selectedDates = [];
  
  function handleMultiSelect(dates) {
    selectedDates = dates;
    console.log("Selected dates:", dates);
  }
</script>

<Calendar 
  mode="multiple"
  selected={selectedDates}
  onselect={handleMultiSelect}
/>
```

### Date Range Calendar
```svelte
<script>
  import { Calendar } from "$lib/components/calendar";
  
  let dateRange = [];
  
  function handleRangeSelect(range) {
    dateRange = range;
    console.log("Selected range:", range);
  }
</script>

<Calendar 
  mode="range"
  selected={dateRange}
  onselect={handleRangeSelect}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
/>
```

## Command Component

### Basic Command Palette
```svelte
<script>
  import { 
    Command, 
    CommandInput, 
    CommandList, 
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut
  } from "$lib/components/command";
  
  function handleSelect(value) {
    console.log("Selected:", value);
  }
</script>

<Command class="h-[400px] w-[350px]" variant="dialog">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    
    <CommandGroup heading="Suggestions">
      <CommandItem value="calendar" onSelect={handleSelect}>
        Calendar
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
      <CommandItem value="search-emoji" onSelect={handleSelect}>
        Search Emoji
      </CommandItem>
      <CommandItem value="calculator" onSelect={handleSelect}>
        Calculator
      </CommandItem>
    </CommandGroup>
    
    <CommandSeparator />
    
    <CommandGroup heading="Settings">
      <CommandItem value="profile" onSelect={handleSelect}>
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem value="billing" onSelect={handleSelect}>
        Billing
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem value="settings" onSelect={handleSelect}>
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Pagination Component

### Basic Pagination
```svelte
<script>
  import { Pagination } from "$lib/components/pagination";
  
  let currentPage = 1;
  let totalItems = 100;
  let itemsPerPage = 10;
  
  function handlePageChange(page) {
    currentPage = page;
    console.log("Page changed to:", page);
  }
</script>

<Pagination 
  page={currentPage}
  total={totalItems}
  perPage={itemsPerPage}
  onPageChange={handlePageChange}
  siblingCount={2}
  showEdges={true}
/>
```

### Custom Pagination with Components
```svelte
<script>
  import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
    PaginationPrevious, 
    PaginationNext, 
    PaginationEllipsis 
  } from "$lib/components/pagination";
</script>

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" />
    </PaginationItem>
    
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    
    <PaginationItem>
      <PaginationLink href="/page/2" isActive>2</PaginationLink>
    </PaginationItem>
    
    <PaginationItem>
      <PaginationLink href="/page/3">3</PaginationLink>
    </PaginationItem>
    
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    
    <PaginationItem>
      <PaginationNext href="/page/3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Data Table Component

### Basic Data Table
```svelte
<script>
  import { DataTable } from "$lib/components/data-table";
  
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  ];
  
  const columns = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      id: "email", 
      accessorKey: "email",
      header: "Email",
      sortable: true,
    },
    {
      id: "role",
      accessorKey: "role", 
      header: "Role",
      filterable: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: (value) => {
        return `<span class="badge ${value === 'Active' ? 'badge-success' : 'badge-error'}">${value}</span>`;
      }
    },
  ];
</script>

<DataTable 
  {data}
  {columns}
  enableSorting={true}
  enableFiltering={true}
  enableSelection={true}
  enablePagination={true}
  pageSize={5}
  variant="striped"
/>
```

### Advanced Data Table with Custom Handlers
```svelte
<script>
  import { DataTable } from "$lib/components/data-table";
  
  let tableData = [];
  let loading = false;
  let sorting = null;
  let columnFilters = [];
  let rowSelection = {};
  let pagination = { pageIndex: 0, pageSize: 10 };
  
  // Simulate API calls
  async function loadData() {
    loading = true;
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Your API call here
    tableData = await fetchDataFromAPI({
      sorting,
      filters: columnFilters,
      pagination
    });
    
    loading = false;
  }
  
  function handleSortingChange(newSorting) {
    sorting = newSorting;
    loadData();
  }
  
  function handleColumnFiltersChange(newFilters) {
    columnFilters = newFilters;
    pagination.pageIndex = 0; // Reset to first page
    loadData();
  }
  
  function handleRowSelectionChange(newSelection) {
    rowSelection = newSelection;
    console.log("Selected rows:", newSelection);
  }
  
  function handlePaginationChange(newPagination) {
    pagination = newPagination;
    loadData();
  }
  
  // Load initial data
  onMount(() => {
    loadData();
  });
</script>

<DataTable 
  data={tableData}
  {columns}
  {loading}
  {sorting}
  {columnFilters}
  {rowSelection}
  {pagination}
  manualSorting={true}
  manualFiltering={true}
  manualPagination={true}
  onSortingChange={handleSortingChange}
  onColumnFiltersChange={handleColumnFiltersChange}
  onRowSelectionChange={handleRowSelectionChange}
  onPaginationChange={handlePaginationChange}
  rowCount={totalRowCount}
  emptyMessage="No users found"
/>
```

## Accessibility Features

All components include comprehensive accessibility features:

- **Proper ARIA labels and roles**
- **Keyboard navigation support**
- **Screen reader compatibility**
- **Focus management**
- **High contrast support**

## Styling and Customization

Components use daisyUI classes and can be customized using:

- **Variant props** for different styles
- **Size props** for different scales  
- **Custom CSS classes** via the `class` prop
- **Tailwind utility classes** for fine-tuning
- **DaisyUI theme variables** for consistent theming