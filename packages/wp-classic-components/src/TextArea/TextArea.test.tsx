import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './TextArea.stories';

const TextArea = composeStory(Default, Meta);

it('should render the component', () => {
	render(<TextArea />);

	const textarea = screen.queryByLabelText('Tagline');

	expect(textarea).toBeEnabled();
	expect(textarea).toBeInTheDocument();
});

it('should render with the static class', () => {
	render(<TextArea data-testid="textarea" />);

	const root = screen.getByTestId('textarea');
	const textarea = screen.getByLabelText('Tagline');

	expect(root).toHaveClass('wp-classic-TextArea-root');
	expect(textarea).toHaveClass('wp-classic-TextArea-input');
});

it('should render with the custom class', () => {
	render(<TextArea data-testid="textarea" className="custom-class" />);

	const root = screen.getByTestId('textarea');

	expect(root).toHaveClass('wp-classic-TextArea-root', 'custom-class');
});

it('should render with the inline style', () => {
	render(<TextArea style={{ marginRight: 10 }} data-testid="textarea" />);

	const root = screen.getByTestId('textarea');

	expect(root).toHaveStyle({ 'margin-right': '10px' });
});

it('should render with the "code" class', () => {
	render(<TextArea isCode />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveClass('code');
});

it('should render the "cols" attribute', () => {
	render(<TextArea cols={100} />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveAttribute('cols', '100');
});

it('should render the "rows" attribute', () => {
	render(<TextArea rows={200} />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveAttribute('rows', '200');
});

it('should render with the "id" attribute', () => {
	render(<TextArea id="textarea-id-1" data-testid="textarea" />);

	const root = screen.getByTestId('textarea');

	expect(root).toHaveAttribute('id', 'textarea-id-1');
});

it('should render with the "tabindex" attribute', () => {
	render(<TextArea excludeFromTabOrder />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveAttribute('tabindex', '-1');
});

it('should render with description', () => {
	render(<TextArea description="Describe what's the site is about" />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveAccessibleDescription(
		"Describe what's the site is about"
	);
});

it('should be disabled', () => {
	render(<TextArea isDisabled />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toBeDisabled();
});

it('should be readonly', () => {
	render(<TextArea isReadOnly />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveAttribute('readonly');
});

it('should be marked as required', () => {
	render(<TextArea isRequired />);

	const textarea = screen.getByLabelText(new RegExp('Tagline *'));

	expect(textarea).toBeRequired();
});

it('should be marked as invalid and show error message', () => {
	render(<TextArea validate={() => 'This is an error message!'} />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toBeInvalid();
	expect(textarea).toHaveAccessibleDescription('This is an error message!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<TextArea defaultValue="Hello" />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveValue('Hello');

	await user.type(textarea, ' World!');

	expect(textarea).toHaveValue('Hello World!');
});

it('should have value (controlled)', async () => {
	const user = userEvent.setup();

	render(<TextArea value="Hello" />);

	const textarea = screen.getByLabelText('Tagline');

	expect(textarea).toHaveValue('Hello');

	await user.type(textarea, ' World!');

	expect(textarea).toHaveValue('Hello');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<TextArea onChange={fn} />);

	const textarea = screen.getByLabelText('Tagline');

	await user.type(textarea, 'Abc');

	expect(fn).toHaveBeenCalledWith('Abc');
});

it('should not render invalid html attributes', async () => {
	// @ts-expect-error
	render(<TextArea foo="bar" data-testid="textarea" />);

	const root = screen.getByTestId('textarea');
	const textarea = screen.getByLabelText('Tagline');

	expect(root).not.toHaveAttribute('foo');
	expect(textarea).not.toHaveAttribute('foo');
});
