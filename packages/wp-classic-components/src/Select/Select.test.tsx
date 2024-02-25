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
