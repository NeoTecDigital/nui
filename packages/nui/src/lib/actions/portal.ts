/**
 * Portal action for rendering elements outside their normal DOM tree
 * Used for modals, tooltips, and other overlay components
 */

export interface PortalOptions {
	target?: HTMLElement | string;
}

export function portal(node: HTMLElement, options: PortalOptions = {}) {
	let target: HTMLElement;

	function getTarget(): HTMLElement {
		if (typeof options.target === "string") {
			const element = document.querySelector(options.target);
			if (!element) {
				throw new Error(`Portal target "${options.target}" not found`);
			}
			return element as HTMLElement;
		}
		return options.target || document.body;
	}

	function mount() {
		target = getTarget();
		target.appendChild(node);
	}

	function unmount() {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	// Mount immediately
	mount();

	return {
		update(newOptions: PortalOptions = {}) {
			options = newOptions;
			unmount();
			mount();
		},
		destroy() {
			unmount();
		}
	};
}