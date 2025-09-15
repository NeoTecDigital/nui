import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Button from './button.svelte';

describe('Button Component', () => {
	it('renders with default variant and size', () => {
		render(Button, { children: () => 'Click me' });
		const button = screen.getByRole('button');
		
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Click me');
		expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
	});

	it('renders with different variants', () => {
		const { rerender } = render(Button, { 
			variant: 'destructive',
			children: () => 'Delete'
		});
		
		let button = screen.getByRole('button');
		expect(button).toHaveClass('btn-error');

		rerender({ variant: 'outline', children: () => 'Outline' });
		button = screen.getByRole('button');
		expect(button).toHaveClass('btn-outline');
	});

	it('renders as link when href is provided', () => {
		render(Button, { 
			href: '/test',
			children: () => 'Link button'
		});
		
		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
		expect(link).toHaveClass('btn');
	});

	it('handles disabled state correctly', () => {
		render(Button, { 
			disabled: true,
			children: () => 'Disabled'
		});
		
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('applies custom className', () => {
		render(Button, { 
			class: 'custom-class',
			children: () => 'Custom'
		});
		
		const button = screen.getByRole('button');
		expect(button).toHaveClass('custom-class');
	});
});