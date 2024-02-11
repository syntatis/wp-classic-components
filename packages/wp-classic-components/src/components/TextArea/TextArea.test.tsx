import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { TextArea } from './TextArea';

it('should render the textarea', () => {
	render(<TextArea label="Comment" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toBeInTheDocument();
	expect(textarea).toBeEnabled();
});

it('should render with the static class', () => {
	render(<TextArea label="Comment" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveClass('wp-classic-TextArea-input');
	expect(textarea.parentNode).toHaveClass('wp-classic-TextArea-root');
});

it('should render with the static class', () => {
	render(<TextArea label="Comment" className="custom-class" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea.parentNode).toHaveClass(
		'wp-classic-TextArea-root',
		'custom-class'
	);
});

it('should render with the inline style', () => {
	render(<TextArea label="Comment" style={{ marginRight: 10 }} />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea.parentNode).toHaveStyle({ 'margin-right': '10px' });
});

it('should render with the "code" class', () => {
	render(<TextArea label="Comment" isCode />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveClass('code');
});

it('should render the "cols" attribute', () => {
	render(<TextArea label="Comment" cols={100} />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveAttribute('cols', '100');
});

it('should render the "rows" attribute', () => {
	render(<TextArea label="Comment" rows={200} />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveAttribute('rows', '200');
});

it('should render with description', () => {
	render(<TextArea label="Comment" description="This is the description!" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveAccessibleDescription('This is the description!');
});

it('should be disabled', () => {
	render(<TextArea label="Comment" isDisabled />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toBeDisabled();
});

it('should have value (controlled)', () => {
	render(<TextArea label="Comment" value="Hello World!" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveValue('Hello World!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<TextArea label="Comment" defaultValue="Hello" />);

	const textarea = screen.getByLabelText('Comment');

	expect(textarea).toHaveValue('Hello');

	await user.type(textarea, ' World!');

	expect(textarea).toHaveValue('Hello World!');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<TextArea label="Comment" onChange={fn} />);

	const textarea = screen.getByLabelText('Comment');

	await user.type(textarea, 'Abc');

	expect(fn).toHaveBeenCalledWith('Abc');
});
