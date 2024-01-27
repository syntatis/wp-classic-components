import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', async () => {
	it('should render the button', () => {
		render(<Button>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toBeInTheDocument();
	});

	it('should render the button with the static class', () => {
		render(<Button>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.classList.contains('button')).toBe(true);
		expect(button.classList.contains('button-primary')).toBe(true);
	});

	it('should render the button with the "secondary" variant class name', () => {
		render(<Button variant="secondary">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.classList.contains('button-secondary')).toBe(true);
	});

	it('should render the button with the custom class name', () => {
		render(<Button className="foo-bar">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.classList.contains('foo-bar')).toBe(true);
	});

	it('should render the button with the id', () => {
		render(<Button id="1">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.id).toBe('1');
	});

	it('should render the button with the tabindex attribute', () => {
		render(<Button tabIndex={1}>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.tabIndex).toBe(1);
	});

	it('should render the button with the role attribute', () => {
		render(<Button role="presentation">Save changes</Button>);

		const button = screen.getByRole('presentation');

		expect(button.textContent).toBe('Save changes');
	});

	it('should render the button with the inline style', () => {
		render(<Button style={{ width: 100 }}>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.style.width).toEqual('100px');
	});

	it('should render the button with the "aria-*" label', () => {
		render(<Button aria-label="Save changes" />);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button.ariaLabel).toEqual('Save changes');
	});
});
