import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

it('should render the button', () => {
	render(<Button>Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
});

describe('variants', () => {
	it('should render as "secondary" variant', () => {
		render(<Button variant="secondary">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-secondary');
	});

	it('should render as small "size" variant', () => {
		render(<Button size="small">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-small');
	});

	it('should render as large "size" variant', () => {
		render(<Button size="large">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-large');
	});

	it('should render as hero "size" variant', () => {
		render(<Button size="hero">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-hero');
	});
});

describe('attributes', () => {
	it('should render with the "id"', () => {
		render(<Button id="1">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('id', '1');
	});

	it('should render with the type "submit"', () => {
		render(<Button type="submit">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('type', 'submit');
	});

	it('should render with the type "reset"', () => {
		render(<Button type="reset">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('type', 'reset');
	});

	describe('styles', () => {
		it('should render with the static class', () => {
			render(<Button>Save changes</Button>);

			const button = screen.getByRole('button', { name: 'Save changes' });

			expect(button).toHaveClass('button');
			expect(button).toHaveClass('button-primary');
		});

		it('should render with the custom class name', () => {
			render(<Button className="foo-bar">Save changes</Button>);

			const button = screen.getByRole('button', { name: 'Save changes' });

			expect(button).toHaveClass('foo-bar');
		});

		it('should render with the inline style', () => {
			render(<Button style={{ width: 100 }}>Save changes</Button>);

			const button = screen.getByRole('button', { name: 'Save changes' });

			expect(button).toHaveStyle({ width: '100px' });
		});
	});

	describe('a11y', () => {
		it('should render with the "aria-*" label', () => {
			render(<Button aria-label="Save changes" />);

			const button = screen.getByRole('button', { name: 'Save changes' });

			expect(button).toHaveAttribute('aria-label', 'Save changes');
		});

		it('should render with the "role" attribute', () => {
			render(<Button role="link">Save changes</Button>);

			const button = screen.getByRole('link', { name: 'Save changes' });

			expect(button).toBeInTheDocument();
		});

		it('should render with the "tabindex" attribute', () => {
			render(<Button excludeFromTabOrder>Save changes</Button>);

			const button = screen.getByRole('button', { name: 'Save changes' });

			expect(button).toHaveAttribute('tabindex', '-1');
		});
	});
});

describe('events', () => {
	it('should call the "onPress" callback', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(<Button onPress={fn}>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		await user.click(button);
		expect(fn).toBeCalledTimes(1);
	});

	it('should call the "onHoverChange" callback', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(<Button onHoverChange={fn}>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		await user.hover(button);
		expect(fn).toBeCalledTimes(1);
	});
});
