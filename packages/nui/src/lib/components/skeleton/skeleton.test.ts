import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Skeleton from "./skeleton.svelte";
import SkeletonText from "./skeleton-text.svelte";
import SkeletonCard from "./skeleton-card.svelte";
import SkeletonList from "./skeleton-list.svelte";

describe("Skeleton Components", () => {
	describe("Skeleton", () => {
		it("renders with default props", () => {
			render(Skeleton, {});
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toBeInTheDocument();
			expect(skeleton).toHaveAttribute("role", "status");
			expect(skeleton).toHaveAttribute("aria-label", "Loading...");
		});

		it("applies variant classes", () => {
			render(Skeleton, { variant: "circular" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveClass("rounded-full");
		});

		it("applies size classes for text variant", () => {
			render(Skeleton, { variant: "text", size: "lg" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveClass("h-5");
		});

		it("applies size classes for circular variant", () => {
			render(Skeleton, { variant: "circular", size: "lg" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveClass("w-16", "h-16");
		});

		it("applies animation classes", () => {
			render(Skeleton, { animation: "pulse" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveClass("animate-pulse");
		});

		it("disables animation when set to none", () => {
			render(Skeleton, { animation: "none" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).not.toHaveClass("animate-pulse");
		});

		it("applies custom width and height", () => {
			render(Skeleton, { width: "200px", height: "100px" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveStyle({
				width: "200px",
				height: "100px"
			});
		});

		it("converts numeric dimensions to pixels", () => {
			render(Skeleton, { width: 150, height: 75 });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveStyle({
				width: "150px",
				height: "75px"
			});
		});

		it("renders multiple skeletons when count > 1", () => {
			render(Skeleton, { count: 3 });
			const skeletons = document.querySelectorAll('[data-skeleton]');
			expect(skeletons).toHaveLength(3);
		});

		it("applies custom className", () => {
			render(Skeleton, { class: "custom-skeleton" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveClass("custom-skeleton");
		});

		it("applies default dimensions for different variants", () => {
			render(Skeleton, { variant: "rectangular" });
			const skeleton = document.querySelector('[data-skeleton]');
			expect(skeleton).toHaveStyle({
				width: "100%",
				height: "200px"
			});
		});
	});

	describe("SkeletonText", () => {
		it("renders with default props", () => {
			render(SkeletonText, {});
			const skeletonText = document.querySelector('[data-skeleton-text]');
			expect(skeletonText).toBeInTheDocument();
			
			// Should render 3 lines by default
			const skeletons = document.querySelectorAll('[data-skeleton]');
			expect(skeletons).toHaveLength(3);
		});

		it("renders custom number of lines", () => {
			render(SkeletonText, { lines: 5 });
			const skeletons = document.querySelectorAll('[data-skeleton]');
			expect(skeletons).toHaveLength(5);
		});

		it("applies custom last line width", () => {
			render(SkeletonText, { 
				lines: 2,
				lastLineWidth: "50%" 
			});
			
			const skeletons = document.querySelectorAll('[data-skeleton]');
			const lastSkeleton = skeletons[skeletons.length - 1];
			expect(lastSkeleton).toHaveStyle({ width: "50%" });
		});

		it("applies custom className", () => {
			render(SkeletonText, { class: "custom-text" });
			const skeletonText = document.querySelector('[data-skeleton-text]');
			expect(skeletonText).toHaveClass("custom-text");
		});
	});

	describe("SkeletonCard", () => {
		it("renders with default props", () => {
			render(SkeletonCard, {});
			const skeletonCard = document.querySelector('[data-skeleton-card]');
			expect(skeletonCard).toBeInTheDocument();
		});

		it("shows avatar by default", () => {
			render(SkeletonCard, {});
			// Should have circular skeleton for avatar
			const circularSkeleton = document.querySelector('.rounded-full');
			expect(circularSkeleton).toBeInTheDocument();
		});

		it("hides avatar when disabled", () => {
			render(SkeletonCard, { showAvatar: false });
			const circularSkeleton = document.querySelector('.rounded-full');
			expect(circularSkeleton).not.toBeInTheDocument();
		});

		it("shows image when enabled", () => {
			render(SkeletonCard, { showImage: true });
			// Should have rectangular skeleton for image
			const rectangularSkeleton = document.querySelector('[data-skeleton]');
			expect(rectangularSkeleton).toBeInTheDocument();
		});

		it("shows title by default", () => {
			render(SkeletonCard, {});
			// Should have text skeletons for title
			const textSkeletons = document.querySelectorAll('[data-skeleton]');
			expect(textSkeletons.length).toBeGreaterThan(0);
		});

		it("shows description by default", () => {
			render(SkeletonCard, {});
			const skeletonText = document.querySelector('[data-skeleton-text]');
			expect(skeletonText).toBeInTheDocument();
		});

		it("shows actions by default", () => {
			render(SkeletonCard, {});
			// Should have multiple skeletons including action buttons
			const skeletons = document.querySelectorAll('[data-skeleton]');
			expect(skeletons.length).toBeGreaterThan(3);
		});

		it("applies custom description lines", () => {
			render(SkeletonCard, { descriptionLines: 5 });
			// The SkeletonText component should render 5 lines
			const skeletonText = document.querySelector('[data-skeleton-text]');
			expect(skeletonText).toBeInTheDocument();
		});

		it("applies custom avatar size", () => {
			render(SkeletonCard, { avatarSize: "lg" });
			const circularSkeleton = document.querySelector('.rounded-full');
			expect(circularSkeleton).toHaveClass("w-16", "h-16");
		});
	});

	describe("SkeletonList", () => {
		it("renders with default props", () => {
			render(SkeletonList, {});
			const skeletonList = document.querySelector('[data-skeleton-list]');
			expect(skeletonList).toBeInTheDocument();
			
			// Should render 5 items by default
			const listItems = skeletonList?.children;
			expect(listItems).toHaveLength(5);
		});

		it("renders custom number of items", () => {
			render(SkeletonList, { items: 3 });
			const skeletonList = document.querySelector('[data-skeleton-list]');
			const listItems = skeletonList?.children;
			expect(listItems).toHaveLength(3);
		});

		it("shows avatar by default", () => {
			render(SkeletonList, {});
			const circularSkeletons = document.querySelectorAll('.rounded-full');
			expect(circularSkeletons.length).toBeGreaterThan(0);
		});

		it("hides avatar when disabled", () => {
			render(SkeletonList, { showAvatar: false });
			const circularSkeletons = document.querySelectorAll('.rounded-full');
			expect(circularSkeletons).toHaveLength(0);
		});

		it("shows icon when enabled", () => {
			render(SkeletonList, { 
				showAvatar: false,
				showIcon: true 
			});
			// Should have small rectangular skeletons for icons
			const skeletons = document.querySelectorAll('[data-skeleton]');
			expect(skeletons.length).toBeGreaterThan(0);
		});

		it("applies custom avatar size", () => {
			render(SkeletonList, { avatarSize: "sm" });
			const circularSkeletons = document.querySelectorAll('.rounded-full');
			// Check if at least one has the small size classes
			const hasSmallSize = Array.from(circularSkeletons).some(el => 
				el.classList.contains("w-8") && el.classList.contains("h-8")
			);
			expect(hasSmallSize).toBe(true);
		});

		it("applies custom className", () => {
			render(SkeletonList, { class: "custom-list" });
			const skeletonList = document.querySelector('[data-skeleton-list]');
			expect(skeletonList).toHaveClass("custom-list");
		});
	});
});