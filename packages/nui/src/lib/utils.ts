import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Compatible with daisyUI classes and custom utility classes
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Convert kebab-case component names to title case for display
 */
export function getComponentName(name: string): string {
	return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Type utilities for component props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/**
 * DaisyUI theme utilities
 */
export interface DaisyTheme {
	primary: string;
	secondary: string;
	accent: string;
	neutral: string;
	"base-100": string;
	info: string;
	success: string;
	warning: string;
	error: string;
}

/**
 * Get current daisyUI theme colors from CSS custom properties
 */
export function getDaisyTheme(): Partial<DaisyTheme> {
	if (typeof window === "undefined") return {};
	
	const style = getComputedStyle(document.documentElement);
	return {
		primary: style.getPropertyValue("--p"),
		secondary: style.getPropertyValue("--s"),
		accent: style.getPropertyValue("--a"),
		neutral: style.getPropertyValue("--n"),
		"base-100": style.getPropertyValue("--b1"),
		info: style.getPropertyValue("--in"),
		success: style.getPropertyValue("--su"),
		warning: style.getPropertyValue("--wa"),
		error: style.getPropertyValue("--er"),
	};
}

/**
 * Accessibility utilities
 */
export function createAriaDescribedBy(id: string, condition: boolean): string | undefined {
	return condition ? id : undefined;
}

export function generateId(prefix = "nui"): string {
	return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Focus management utilities
 */
export function trapFocus(element: HTMLElement): () => void {
	const focusableElements = element.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);
	const firstElement = focusableElements[0] as HTMLElement;
	const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

	function handleTabKey(e: KeyboardEvent) {
		if (e.key !== "Tab") return;

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement?.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement?.focus();
				e.preventDefault();
			}
		}
	}

	element.addEventListener("keydown", handleTabKey);
	firstElement?.focus();

	return () => {
		element.removeEventListener("keydown", handleTabKey);
	};
}