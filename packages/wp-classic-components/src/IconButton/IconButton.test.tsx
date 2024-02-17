import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './IconButton.stories';

const IconButton = composeStory(Default, Meta);

it('should render the component', () => {
	render(<IconButton />);

	const button = screen.queryByRole('button', { name: 'Download' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render as "secondary" variant', () => {
	render(<IconButton variant="secondary" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-secondary');
});

it('should render "small" size', () => {
	render(<IconButton size="small" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-small');
});

it('should render "large" size', () => {
	render(<IconButton size="large" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-large');
});

it('should render with the static class', () => {
	render(<IconButton />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass(
		'wp-classic-IconButton-root',
		'button',
		'button-primary'
	);
});

it('should render with the custom class name', () => {
	render(<IconButton className="foo-bar" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass(
		'button',
		'button-primary',
		'foo-bar',
		'wp-classic-IconButton-root'
	);
});

it('should render with the inline style', () => {
	render(<IconButton style={{ width: 100 }} />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveStyle({ width: '100px' });
});

it('should render with the "id"', () => {
	render(<IconButton id="icon-button-1" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('id', 'icon-button-1');
});

it('should render with the type "submit"', () => {
	render(<IconButton type="submit" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('type', 'submit');
});

it('should render with the type "reset"', () => {
	render(<IconButton type="reset" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('type', 'reset');
});

it('should render with the "aria-*" label', () => {
	render(<IconButton aria-label="Download changes" />);

	const button = screen.getByRole('button', { name: 'Download changes' });

	expect(button).toHaveAttribute('aria-label', 'Download changes');
});
