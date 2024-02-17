import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon, desktop } from '@wordpress/icons';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Button.stories';

const Button = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Button />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render as "secondary" variant', () => {
	render(<Button variant="secondary" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-secondary');
});

it('should render "small" size', () => {
	render(<Button size="small" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-small');
});

it('should render "large" size', () => {
	render(<Button size="large" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-large');
});

it('should render "hero" size', () => {
	render(<Button size="hero" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-hero');
});

it('should render with the static class', () => {
	render(<Button />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass(
		'wp-classic-Button-root',
		'button',
		'button-primary'
	);
});

it('should render with the custom class name', () => {
	render(<Button className="foo-bar" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('foo-bar');
});

it('should render with the inline style', () => {
	render(<Button style={{ width: 100 }} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveStyle({ width: '100px' });
});

it('should render with the "id"', () => {
	render(<Button id="1" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('id', '1');
});

it('should render with the type "submit"', () => {
	render(<Button type="submit" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('type', 'submit');
});

it('should render with the type "reset"', () => {
	render(<Button type="reset" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('type', 'reset');
});

it('should render with the "aria-*" label', () => {
	render(<Button aria-label="Update changes" />);

	const button = screen.getByRole('button', { name: 'Update changes' });

	expect(button).toHaveAttribute('aria-label', 'Update changes');
});

it('should render with the "role" attribute', () => {
	render(<Button role="link" />);

	const button = screen.queryByRole('link', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
});

it('should render with the "tabindex" attribute', () => {
	render(<Button excludeFromTabOrder />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('tabindex', '-1');
});

it('should be disabled', () => {
	render(<Button isDisabled />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeDisabled();
});

it('should render with the prefix', () => {
	render(<Button prefix={<Icon icon={desktop} data-testid="prefix" />} />);

	const icon = screen.queryByTestId('prefix');

	expect(icon).toBeInTheDocument();
});

it('should render with the suffix', () => {
	render(<Button suffix={<Icon icon={desktop} data-testid="suffix" />} />);

	const icon = screen.queryByTestId('suffix');

	expect(icon).toBeInTheDocument();
});

it('should call the "onPress" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onPress={fn} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	await user.click(button);

	expect(fn).toBeCalledTimes(1);
});

it('should call the "onHoverChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onHoverChange={fn} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	await user.hover(button);

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isHovering: `true`.

	await user.unhover(button);

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isHovering: `true`.
});

it('should call the "onFocusChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onFocusChange={fn} />);

	await user.tab();

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isFocused: `true`.

	await user.tab();

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isFocused: `false`.
});
