import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox';

describe('Checkbox', async () => {
	it('should render the checkboxes', () => {
		render(
			<CheckboxGroup label="Post types">
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(
			screen.getByRole('group', { name: 'Post types' })
		).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Pages' })).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: 'Posts' })).toBeInTheDocument();
	});

	it('should disable the checkboxes', () => {
		render(
			<CheckboxGroup label="Post types" isDisabled>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('group', { name: 'Post types' })).toBeDisabled();
		expect(screen.getByRole('checkbox', { name: 'Pages' })).toBeDisabled();
		expect(screen.getByRole('checkbox', { name: 'Posts' })).toBeDisabled();
	});

	it('should disable the checkboxes', () => {
		render(
			<CheckboxGroup label="Post types" isInvalid>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('checkbox', { name: 'Pages' })).toBeInvalid();
		expect(screen.getByRole('checkbox', { name: 'Posts' })).toBeInvalid();
	});
});
