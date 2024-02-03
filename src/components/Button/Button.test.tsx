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

		expect(button).toHaveClass('button');
		expect(button).toHaveClass('button-primary');
	});

	it('should render the button with the "secondary" variant class name', () => {
		render(<Button variant="secondary">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-secondary');
	});

	it('should render the button with the custom class name', () => {
		render(<Button className="foo-bar">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('foo-bar');
	});

	it('should render the button with the id', () => {
		render(<Button id="1">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('id', '1');
	});

	it('should render the button with the tabindex attribute', () => {
		render(<Button excludeFromTabOrder>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('tabindex', '-1');
	});

	it('should render the button with the inline style', () => {
		render(<Button style={{ width: 100 }}>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveStyle({ width: '100px' });
	});

	it('should render the button with the "aria-*" label', () => {
		render(<Button aria-label="Save changes" />);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('aria-label', 'Save changes');
	});

	it('should render the button with the "role" attribute', () => {
		render(<Button role="link">Save changes</Button>);

		const button = screen.getByRole('link', { name: 'Save changes' });

		expect(button).toBeInTheDocument();
	});

	it('should render the button with the "button-link-delete" class', () => {
		render(<Button role="link">Save changes</Button>);

		const button = screen.getByRole('link', { name: 'Save changes' });

		expect(button).toBeInTheDocument();
	});
});
