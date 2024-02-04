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

	it('should be disabled', () => {
		render(
			<CheckboxGroup label="Post types" isDisabled>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('checkbox', { name: 'Pages' })).toBeDisabled();
		expect(screen.getByRole('checkbox', { name: 'Posts' })).toBeDisabled();
	});

	it('should be readonly', () => {
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

	it('should mark as invalid', () => {
		render(
			<CheckboxGroup label="Post types" isInvalid>
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		expect(screen.getByRole('checkbox', { name: 'Pages' })).toBeInvalid();
		expect(screen.getByRole('checkbox', { name: 'Posts' })).toBeInvalid();
	});

	it('should mark as required', () => {
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

	it('should render the error message', () => {
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

	it('should retain the role', () => {
		render(
			<CheckboxGroup label="Post types" role="presentation">
				<Checkbox>Pages</Checkbox>
				<Checkbox>Posts</Checkbox>
			</CheckboxGroup>
		);

		// Role "presentation" does not override the role "group".
		expect(screen.getByRole('group')).toBeInTheDocument();
	});

	describe('attributes', () => {
		it('should render with the static class', () => {
			render(
				<CheckboxGroup label="Post types">
					<Checkbox>Pages</Checkbox>
					<Checkbox>Posts</Checkbox>
				</CheckboxGroup>
			);

			expect(screen.getByRole('group', { name: 'Post types' })).toHaveClass(
				'wp-classic-CheckboxGroup-root'
			);
		});

		it('should render with the custom class', () => {
			render(
				<CheckboxGroup label="Post types" className="post-type-setting">
					<Checkbox>Pages</Checkbox>
					<Checkbox>Posts</Checkbox>
				</CheckboxGroup>
			);

			expect(screen.getByRole('group', { name: 'Post types' })).toHaveClass(
				'post-type-setting'
			);
		});

		it('should render with the id', () => {
			render(
				<CheckboxGroup label="Post types" id="12345">
					<Checkbox>Pages</Checkbox>
					<Checkbox>Posts</Checkbox>
				</CheckboxGroup>
			);

			expect(screen.getByRole('group', { name: 'Post types' })).toHaveAttribute(
				'id',
				'12345'
			);
		});
	});
});
