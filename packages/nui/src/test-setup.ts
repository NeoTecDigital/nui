import { beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock DaisyUI theme detection for tests
beforeEach(() => {
	// Mock CSS custom properties for DaisyUI themes
	Object.defineProperty(window, 'getComputedStyle', {
		value: () => ({
			getPropertyValue: (prop: string) => {
				const themeMap: Record<string, string> = {
					'--p': '259 94% 51%',
					'--s': '314 100% 47%', 
					'--a': '174 60% 51%',
					'--n': '214 20% 14%',
					'--b1': '0 0% 100%',
					'--in': '198 93% 60%',
					'--su': '158 64% 52%',
					'--wa': '43 96% 56%',
					'--er': '0 91% 71%',
				};
				return themeMap[prop] || '';
			},
		}),
		writable: true,
	});
});