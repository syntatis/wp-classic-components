import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { TextField } from './TextField';

it('should render the textarea', () => {
	render(<TextField label="Username" />);

	const input = screen.getByLabelText('Username');

	expect(input).toBeInTheDocument();
	expect(input).toBeEnabled();
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

it('should render with description', () => {
	render(<TextField label="Username" description="This is the description!" />);

	const input = screen.getByLabelText('Username');

	expect(input).toHaveAccessibleDescription('This is the description!');
});

it('should be disabled', () => {
	render(<TextField label="Username" isDisabled />);

	const input = screen.getByLabelText('Username');

	expect(input).toBeDisabled();
});

it('should be marked as required', () => {
	render(<TextField label="Username" isRequired />);

	const input = screen.getByLabelText(new RegExp('Username *'));

	expect(input).toBeRequired();
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

it('should not render invalid html attributes', async () => {
	// @ts-expect-error
	render(<TextField label="Username" foo="bar" />);

	const input = screen.getByLabelText('Username');

	expect(input).not.toHaveAttribute('foo');
	expect(input.parentNode).not.toHaveAttribute('foo');
});
