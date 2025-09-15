<script lang="ts">
	import { 
		Select, 
		SelectItem, 
		SelectRoot, 
		SelectTrigger, 
		SelectValue, 
		SelectContent, 
		SelectItemAdvanced 
	} from "./index.js";
	import { FormField, FormLabel, FormControl, FormMessage } from "../form/index.js";
	import { Button } from "../button/index.js";

	// Basic select state
	let basicValue = "";
	let advancedValue = "";
	let formValue = "";

	// Form validation
	let error = "";

	function validateForm() {
		if (!formValue) {
			error = "Please select an option";
			return false;
		}
		error = "";
		return true;
	}

	function handleSubmit() {
		if (validateForm()) {
			alert(`Selected: ${formValue}`);
		}
	}

	// Demo data
	const countries = [
		{ value: "us", label: "United States" },
		{ value: "ca", label: "Canada" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "de", label: "Germany" },
		{ value: "fr", label: "France" },
		{ value: "jp", label: "Japan" },
		{ value: "au", label: "Australia" },
		{ value: "br", label: "Brazil" },
	];

	const frameworks = [
		{ value: "svelte", label: "Svelte" },
		{ value: "react", label: "React" },
		{ value: "vue", label: "Vue" },
		{ value: "angular", label: "Angular" },
		{ value: "solid", label: "Solid" },
	];
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
	<div class="text-center">
		<h1 class="text-3xl font-bold mb-2">Select Components Demo</h1>
		<p class="text-base-content/70">
			Demonstrates both basic native select and advanced custom dropdown select components
		</p>
	</div>

	<!-- Basic Native Select -->
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Basic Native Select</h2>
			<p class="text-base-content/70 mb-4">
				Uses native HTML select element with DaisyUI styling
			</p>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label class="label">
						<span class="label-text">Select Country</span>
					</label>
					<Select 
						bind:value={basicValue} 
						placeholder="Choose a country..."
						class="w-full"
					>
						{#each countries as country}
							<SelectItem value={country.value} label={country.label} />
						{/each}
					</Select>
				</div>
				
				<div>
					<label class="label">
						<span class="label-text">Selected Value</span>
					</label>
					<div class="input input-bordered w-full bg-base-200" readonly>
						{basicValue || "No selection"}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Advanced Custom Select -->
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Advanced Custom Select</h2>
			<p class="text-base-content/70 mb-4">
				Custom dropdown implementation with enhanced features and animations
			</p>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label class="label">
						<span class="label-text">Select Framework</span>
					</label>
					<SelectRoot bind:value={advancedValue}>
						<SelectTrigger class="w-full">
							<SelectValue placeholder="Choose a framework..." />
						</SelectTrigger>
						<SelectContent>
							{#each frameworks as framework}
								<SelectItemAdvanced value={framework.value}>
									{framework.label}
								</SelectItemAdvanced>
							{/each}
						</SelectContent>
					</SelectRoot>
				</div>
				
				<div>
					<label class="label">
						<span class="label-text">Selected Framework</span>
					</label>
					<div class="input input-bordered w-full bg-base-200" readonly>
						{advancedValue || "No selection"}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form Integration -->
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Form Integration</h2>
			<p class="text-base-content/70 mb-4">
				Select components integrated with form validation and error handling
			</p>
			
			<FormField name="country" required {error}>
				<FormLabel>Country of Residence</FormLabel>
				<FormControl>
					{#snippet children(props)}
						<SelectRoot bind:value={formValue} invalid={!!error} {...props}>
							<SelectTrigger class="w-full">
								<SelectValue placeholder="Select your country..." />
							</SelectTrigger>
							<SelectContent>
								{#each countries as country}
									<SelectItemAdvanced value={country.value}>
										{country.label}
									</SelectItemAdvanced>
								{/each}
							</SelectContent>
						</SelectRoot>
					{/snippet}
				</FormControl>
				{#if error}
					<FormMessage>{error}</FormMessage>
				{/if}
			</FormField>
			
			<div class="flex justify-end gap-4 mt-6">
				<Button type="button" variant="outline" onclick={() => formValue = ""}>
					Clear
				</Button>
				<Button onclick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	</div>

	<!-- Component Variants -->
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Component Variants</h2>
			<p class="text-base-content/70 mb-4">
				Different states and configurations
			</p>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Error State -->
				<div>
					<label class="label">
						<span class="label-text">Error State</span>
					</label>
					<Select invalid placeholder="This has an error" class="w-full">
						<SelectItem value="option1" label="Option 1" />
						<SelectItem value="option2" label="Option 2" />
					</Select>
					<div class="label">
						<span class="label-text-alt text-error">This field has an error</span>
					</div>
				</div>
				
				<!-- Disabled State -->
				<div>
					<label class="label">
						<span class="label-text">Disabled State</span>
					</label>
					<Select disabled placeholder="This is disabled" class="w-full">
						<SelectItem value="option1" label="Option 1" />
						<SelectItem value="option2" label="Option 2" />
					</Select>
				</div>
			</div>
		</div>
	</div>

	<!-- Demo Values -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body">
			<h3 class="card-title">Current Values (Debug)</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
				<div>
					<strong>Basic Select:</strong>
					<pre class="bg-base-300 p-2 rounded mt-1">{basicValue || "null"}</pre>
				</div>
				<div>
					<strong>Advanced Select:</strong>
					<pre class="bg-base-300 p-2 rounded mt-1">{advancedValue || "null"}</pre>
				</div>
				<div>
					<strong>Form Select:</strong>
					<pre class="bg-base-300 p-2 rounded mt-1">{formValue || "null"}</pre>
				</div>
			</div>
		</div>
	</div>
</div>