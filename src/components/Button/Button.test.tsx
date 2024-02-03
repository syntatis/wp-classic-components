import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', async () => {
	it('should render the button', () => {
		render(<Button>Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toBeInTheDocument();
	});

	it('should render the button with the "submit" type', () => {
		render(<Button type="submit">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('type', 'submit');
	});

	it('should render the button with the "reset" type', () => {
		render(<Button type="reset">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveAttribute('type', 'reset');
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

	it('should render the button with the small "size" variant class name', () => {
		render(<Button size="small">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-small');
	});

	it('should render the button with the large "size" variant class name', () => {
		render(<Button size="large">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-large');
	});

	it('should render the button with the hero "size" variant class name', () => {
		render(<Button size="hero">Save changes</Button>);

		const button = screen.getByRole('button', { name: 'Save changes' });

		expect(button).toHaveClass('button-hero');
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
