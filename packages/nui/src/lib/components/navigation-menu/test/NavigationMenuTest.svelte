<script lang="ts">
	import {
		NavigationMenu,
		NavigationMenuList,
		NavigationMenuItem,
		NavigationMenuTrigger,
		NavigationMenuContent,
		NavigationMenuLink,
	} from "../index.js";

	let { orientation = "horizontal", onValueChange = () => {} } = $props();
</script>

<NavigationMenu {orientation} {onValueChange}>
	<NavigationMenuList>
		<NavigationMenuItem value="home">
			<NavigationMenuLink href="/">Home</NavigationMenuLink>
		</NavigationMenuItem>
		<NavigationMenuItem value="products">
			<NavigationMenuTrigger>Products</NavigationMenuTrigger>
			<NavigationMenuContent>
				<div class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					<NavigationMenuLink href="/products/category1">Category 1</NavigationMenuLink>
					<NavigationMenuLink href="/products/category2">Category 2</NavigationMenuLink>
					<NavigationMenuLink href="/products/category3">Category 3</NavigationMenuLink>
				</div>
			</NavigationMenuContent>
		</NavigationMenuItem>
		<NavigationMenuItem value="about">
			<NavigationMenuLink href="/about">About</NavigationMenuLink>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>