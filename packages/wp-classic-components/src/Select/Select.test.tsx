import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Select.stories';

const Select = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Select />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveRole('combobox');
	expect(select).toBeEnabled();
});

it('should have static class', () => {
	render(<Select data-testid="select" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(select).toHaveClass('wp-classic-Select-input');
	expect(root).toHaveClass('wp-classic-Select-root');
});

it('should have custom class name', () => {
	render(<Select className="setting-select" data-testid="select" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(root).toHaveClass('wp-classic-Select-root', 'setting-select');
	expect(select).not.toHaveClass('setting-select');
});

it('should have inline style', () => {
	render(<Select data-testid="select" style={{ marginBlock: 15 }} />);

	const root = screen.getByTestId('select');
	const select = screen.getByLabelText('Site Language');

	expect(root).toHaveStyle({ 'margin-block': '15px' });
	expect(select).not.toHaveStyle({ 'margin-block': '15px' });
});

it('should have description', () => {
	render(
		<Select
			data-testid="select"
			description="Please select the site language."
		/>
	);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveAccessibleDescription(
		'Please select the site language.'
	);
});

it('should have "id" attribute', () => {
	render(<Select data-testid="select" id="setting-option" />);

	const root = screen.getByTestId('select');
	const select = screen.getByLabelText('Site Language');

	expect(root).toHaveAttribute('id', 'setting-option-Select-root');
	expect(select).toHaveAttribute('id', 'setting-option');
});
