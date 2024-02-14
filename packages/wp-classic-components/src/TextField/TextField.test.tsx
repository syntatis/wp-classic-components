import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { TextField } from './TextField';

it('should render the textarea', () => {
	render(<TextField label="Username" />);

	const input = screen.getByLabelText('Username');

	expect(input).toBeInTheDocument();
	expect(input).toBeEnabled();
	expect(input).toHaveAttribute('type', 'text');
});

it('should render with the static class', () => {
	render(<TextField label="Username" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveClass('wp-classic-TextField-input');
	expect(input.parentNode).toHaveClass('wp-classic-TextField-root');
});

it('should render with the custom class name', () => {
	render(<TextField label="Username" className="input" />);

	const input = screen.getByLabelText('Username');

	expect(input.parentNode).toHaveClass('wp-classic-TextField-root', 'input');
});

it('should render with the "code" class', () => {
	render(<TextField label="Username" isCode />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveClass('code');
});

it('should render with the inline style', () => {
	render(<TextField label="Username" style={{ paddingRight: 30 }} />);

	const input = screen.getByLabelText('Username');

	expect(input.parentNode).toHaveStyle({ 'padding-right': '30px' });
});

it('should render with the description', () => {
	render(<TextField label="Username" description="This is the description!" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAccessibleDescription('This is the description!');
});

it('should render with the description', () => {
	render(<TextField label="Username" description="This is the description!" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAccessibleDescription('This is the description!');
});

it('should render with "id" attribute', () => {
	render(
		<TextField label="Username" id="input-id-1" data-testid="textfield" />
	);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveAttribute('id', 'input-id-1');
});

it('should render with "tabindex" attribute', () => {
	render(<TextField label="Username" excludeFromTabOrder />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAttribute('tabindex', '-1');
});

it('should render with "type" attribute', () => {
	render(<TextField label="Username" type="email" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAttribute('type', 'email');
});

it('should not render invalid html attributes', async () => {
	// @ts-expect-error
	render(<TextField label="Username" foo="bar" />);

	const input = screen.getByLabelText('Username');

	expect(input).not.toHaveAttribute('foo');
	expect(input.parentNode).not.toHaveAttribute('foo');
});

it('should be disabled', () => {
	render(<TextField label="Username" isDisabled />);

	const input = screen.getByLabelText('Username');

	expect(input).toBeDisabled();
});

it('should be readonly', () => {
	render(<TextField label="Username" isReadOnly />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAttribute('readonly');
});

it('should be marked as required', () => {
	render(<TextField label="Username" isRequired />);

	const input = screen.getByLabelText(new RegExp('Username *'));

	expect(input).toBeRequired();
});

it('should be marked as invalid and show error message', () => {
	render(
		<TextField label="Username" validate={() => 'This is the error message!'} />
	);

	const input = screen.getByLabelText('Username');

	expect(input).toBeInvalid();
	expect(input).toHaveAccessibleDescription('This is the error message!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<TextField label="Username" defaultValue="foo" />);

	const input = screen.getByLabelText('Username');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo-bar');
});

it('should have value (controlled)', async () => {
	const user = userEvent.setup();

	render(<TextField label="Username" value="foo" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveValue('foo');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<TextField label="Username" onChange={fn} />);

	const input = screen.getByLabelText('Username');

	await user.type(input, 'Hello World!');

	expect(fn).toHaveBeenCalledWith('Hello World!');
});
