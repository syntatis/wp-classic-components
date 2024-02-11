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
