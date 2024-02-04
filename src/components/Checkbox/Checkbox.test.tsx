import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', async () => {
	it('should render the checkbox', () => {
		render(<Checkbox>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeInTheDocument();
	});

	it('should have the custom class', () => {
		render(<Checkbox className="foo-bar">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox.parentNode?.parentNode).toHaveClass('foo-bar');
	});

	it('should render with the description', () => {
		render(<Checkbox description="This is the description">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAccessibleDescription('This is the description');
	});

	it('should have the "name" attribute', () => {
		render(<Checkbox name="agree">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('name', 'agree');
	});

	it('should have the "id" attribute', () => {
		render(<Checkbox id="tos-agreement">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('id', 'tos-agreement');
	});

	it('should be readonly', () => {
		render(<Checkbox isReadOnly>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('aria-readonly', 'true');
	});

	it('should be checked', () => {
		render(<Checkbox isSelected>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeChecked();
	});

	it('should be disabled', () => {
		render(<Checkbox isDisabled>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeDisabled();
	});

	it('should be excluded from tab order', () => {
		render(<Checkbox excludeFromTabOrder>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('tabindex', '-1');
	});
});
