import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './TextField.stories';

const TextField = composeStory(Default, Meta);

it('should render the component', () => {
	render(<TextField />);

	const input = screen.queryByLabelText('Site Name');

	expect(input).toBeEnabled();
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('type', 'text');
});

it('should render with the static class', () => {
	render(<TextField data-testid="textfield" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveClass('wp-classic-TextField-input');
	expect(input.parentNode).toHaveClass('wp-classic-TextField-root');
});

it('should render with the custom class name', () => {
	render(<TextField className="input" data-testid="textfield" />);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveClass('wp-classic-TextField-root', 'input');
});

it('should render with the "code" class', () => {
	render(<TextField isCode />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveClass('code');
});

it('should render with the inline style', () => {
	render(<TextField style={{ paddingRight: 30 }} data-testid="textfield" />);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveStyle({ 'padding-right': '30px' });
});

it('should render with the description', () => {
	render(<TextField description="Add your site name" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAccessibleDescription('Add your site name');
});

it('should render with "id" attribute', () => {
	render(<TextField id="input-id-1" data-testid="textfield" />);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveAttribute('id', 'input-id-1');
});

it('should render with "tabindex" attribute', () => {
	render(<TextField excludeFromTabOrder />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('tabindex', '-1');
});

it('should render with "type" attribute', () => {
	render(<TextField type="email" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('type', 'email');
});

it('should not render invalid html attributes', async () => {
	// @ts-expect-error
	render(<TextField foo="bar" data-testid="textfield" />);

	const root = screen.getByTestId('textfield');
	const input = screen.getByLabelText('Site Name');

	expect(input).not.toHaveAttribute('foo');
	expect(root).not.toHaveAttribute('foo');
});

it('should be disabled', () => {
	render(<TextField isDisabled />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toBeDisabled();
});

it('should be readonly', () => {
	render(<TextField isReadOnly />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('readonly');
});

it('should be marked as required', () => {
	render(<TextField isRequired />);

	const input = screen.getByLabelText(new RegExp('Site Name *'));

	expect(input).toBeRequired();
});

it('should be marked as invalid and show error message', () => {
	render(<TextField validate={() => 'An unexpected error occurred!'} />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toBeInvalid();
	expect(input).toHaveAccessibleDescription('An unexpected error occurred!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<TextField defaultValue="foo" />);

	const input = screen.getByLabelText('Site Name');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo-bar');
});

it('should have value (controlled)', async () => {
	const user = userEvent.setup();

	render(<TextField value="foo" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveValue('foo');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<TextField onChange={fn} />);

	const input = screen.getByLabelText('Site Name');

	await user.type(input, 'Hello World!');

	expect(fn).toHaveBeenCalledWith('Hello World!');
});
