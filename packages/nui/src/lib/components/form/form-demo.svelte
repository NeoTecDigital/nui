<script lang="ts">
	import { FormField, FormLabel, FormControl, FormMessage } from "./index.js";
	import { Input } from "../input/index.js";
	import { Checkbox } from "../checkbox/index.js";
	import { RadioGroup, RadioGroupItem } from "../radio-group/index.js";
	import { Switch } from "../switch/index.js";
	import { Textarea } from "../textarea/index.js";
	import { Select, SelectItem } from "../select/index.js";
	import { Label } from "../label/index.js";
	import { Button } from "../button/index.js";

	// Form state
	let formData = {
		name: "",
		email: "",
		password: "",
		bio: "",
		notifications: false,
		theme: "light",
		country: "",
		newsletter: false,
	};

	// Form validation state
	let errors: Record<string, string> = {};

	function validateForm() {
		errors = {};
		
		if (!formData.name.trim()) {
			errors.name = "Name is required";
		}
		
		if (!formData.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Email is invalid";
		}
		
		if (!formData.password) {
			errors.password = "Password is required";
		} else if (formData.password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}
		
		if (!formData.country) {
			errors.country = "Please select a country";
		}
		
		return Object.keys(errors).length === 0;
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (validateForm()) {
			console.log("Form submitted:", formData);
			alert("Form submitted successfully!");
		}
	}
</script>

<div class="max-w-2xl mx-auto p-6">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-2xl mb-6">Form Components Demo</h2>
			
			<form onsubmit={handleSubmit} class="space-y-6">
				<!-- Name Field -->
				<FormField name="name" required error={errors.name}>
					<FormLabel>Full Name</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<Input
								bind:value={formData.name}
								placeholder="Enter your full name"
								invalid={!!errors.name}
								{...props}
							/>
						{/snippet}
					</FormControl>
					{#if errors.name}
						<FormMessage>{errors.name}</FormMessage>
					{/if}
				</FormField>

				<!-- Email Field -->
				<FormField name="email" required error={errors.email}>
					<FormLabel>Email Address</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<Input
								type="email"
								bind:value={formData.email}
								placeholder="Enter your email"
								invalid={!!errors.email}
								{...props}
							/>
						{/snippet}
					</FormControl>
					{#if errors.email}
						<FormMessage>{errors.email}</FormMessage>
					{/if}
				</FormField>

				<!-- Password Field -->
				<FormField name="password" required error={errors.password}>
					<FormLabel>Password</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<Input
								type="password"
								bind:value={formData.password}
								placeholder="Enter your password"
								invalid={!!errors.password}
								{...props}
							/>
						{/snippet}
					</FormControl>
					{#if errors.password}
						<FormMessage>{errors.password}</FormMessage>
					{/if}
				</FormField>

				<!-- Bio Field -->
				<FormField name="bio" description="Tell us a bit about yourself">
					<FormLabel>Bio</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<Textarea
								bind:value={formData.bio}
								placeholder="Enter your bio..."
								autoResize
								minRows={3}
								maxRows={6}
								{...props}
							/>
						{/snippet}
					</FormControl>
				</FormField>

				<!-- Country Select -->
				<FormField name="country" required error={errors.country}>
					<FormLabel>Country</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<Select
								bind:value={formData.country}
								placeholder="Select your country"
								invalid={!!errors.country}
								{...props}
							>
								<SelectItem value="us" label="United States" />
								<SelectItem value="ca" label="Canada" />
								<SelectItem value="uk" label="United Kingdom" />
								<SelectItem value="de" label="Germany" />
								<SelectItem value="fr" label="France" />
								<SelectItem value="jp" label="Japan" />
							</Select>
						{/snippet}
					</FormControl>
					{#if errors.country}
						<FormMessage>{errors.country}</FormMessage>
					{/if}
				</FormField>

				<!-- Theme Radio Group -->
				<FormField name="theme">
					<FormLabel>Theme Preference</FormLabel>
					<FormControl>
						{#snippet children(props)}
							<RadioGroup bind:value={formData.theme} {...props}>
								<div class="flex items-center space-x-2">
									<RadioGroupItem value="light" />
									<Label>Light</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroupItem value="dark" />
									<Label>Dark</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroupItem value="system" />
									<Label>System</Label>
								</div>
							</RadioGroup>
						{/snippet}
					</FormControl>
				</FormField>

				<!-- Notifications Switch -->
				<FormField name="notifications">
					<div class="flex items-center justify-between">
						<div>
							<FormLabel>Push Notifications</FormLabel>
							<FormMessage type="description">
								Receive notifications about updates and news
							</FormMessage>
						</div>
						<FormControl>
							{#snippet children(props)}
								<Switch
									bind:checked={formData.notifications}
									{...props}
								/>
							{/snippet}
						</FormControl>
					</div>
				</FormField>

				<!-- Newsletter Checkbox -->
				<FormField name="newsletter">
					<div class="flex items-center space-x-2">
						<FormControl>
							{#snippet children(props)}
								<Checkbox
									bind:checked={formData.newsletter}
									{...props}
								/>
							{/snippet}
						</FormControl>
						<FormLabel>Subscribe to newsletter</FormLabel>
					</div>
				</FormField>

				<!-- Submit Button -->
				<div class="flex justify-end gap-4 pt-4">
					<Button type="button" variant="outline">Cancel</Button>
					<Button type="submit">Submit Form</Button>
				</div>
			</form>
		</div>
	</div>
	
	<!-- Form Data Display -->
	<div class="card bg-base-200 shadow-xl mt-6">
		<div class="card-body">
			<h3 class="card-title">Form Data (Debug)</h3>
			<pre class="text-sm overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
		</div>
	</div>
</div>