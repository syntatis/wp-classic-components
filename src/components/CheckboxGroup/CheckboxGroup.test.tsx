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

	it('should set the checkboxes readonly', () => {
		render(
			<CheckboxGroup label="Post types" isReadOnly>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('checkbox', { name: 'Pages' })).toHaveAttribute(
			'aria-readonly',
			'true'
		);

		expect(screen.getByRole('checkbox', { name: 'Posts' })).toHaveAttribute(
			'aria-readonly',
			'true'
		);
	});

	it('should set the checkboxes required', () => {
		render(
			<CheckboxGroup label="Post types" isRequired>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('group')).toHaveAccessibleName('Post types *');

		expect(screen.getByRole('checkbox', { name: 'Pages' })).toHaveAttribute(
			'aria-required',
			'true'
		);

		expect(screen.getByRole('checkbox', { name: 'Posts' })).toHaveAttribute(
			'aria-required',
			'true'
		);
	});

	it('should render the description', () => {
		render(
			<CheckboxGroup label="Post types" description="This is a description">
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(
			screen.getByRole('group', { name: 'Post types' })
		).toHaveAccessibleDescription('This is a description');
	});

	it('should render the controlled error message', () => {
		render(
			<CheckboxGroup
				label="Post types"
				errorMessage="This is an error message"
				isInvalid
			>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('group')).toHaveAccessibleDescription(
			'This is an error message'
		);
	});
});
