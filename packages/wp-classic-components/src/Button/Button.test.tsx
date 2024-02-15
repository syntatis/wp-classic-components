import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon, desktop } from '@wordpress/icons';
import { expect, it, vi } from 'vitest';
import { Button } from './Button';

it('should render the component', () => {
	render(<Button>Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeEnabled();
	expect(button).toBeInTheDocument();
});

it('should render as "secondary" variant', () => {
	render(<Button variant="secondary">Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-secondary');
});

it('should render "small" size', () => {
	render(<Button size="small">Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-small');
});

it('should render "large" size', () => {
	render(<Button size="large">Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-large');
});

it('should render "hero" size', () => {
	render(<Button size="hero">Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-hero');
});

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

it('should be disabled', () => {
	render(<Button isDisabled>Save changes</Button>);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeDisabled();
});

it('should render with the prefix', () => {
	render(
		<Button prefix={<Icon icon={desktop} data-testid="prefix" />}>
			Save changes
		</Button>
	);

	const icon = screen.queryByTestId('prefix');

	expect(icon).toBeInTheDocument();
});

it('should render with the suffix', () => {
	render(
		<Button suffix={<Icon icon={desktop} data-testid="suffix" />}>
			Save changes
		</Button>
	);

	const icon = screen.queryByTestId('suffix');

	expect(icon).toBeInTheDocument();
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

it('should call the "onFocusChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onFocusChange={fn}>Save changes</Button>);

	await user.tab();

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isFocused: `true`.

	await user.tab();

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isFocused: `false`.
});
