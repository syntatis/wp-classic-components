import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', async () => {
	it('should render the checkbox', () => {
		render(<Checkbox>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeInTheDocument();
	});

	it('should render the checkbox with the "name" attribute', () => {
		render(<Checkbox name="agree">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('name', 'agree');
	});

	it('should render with the custom class', () => {
		render(<Checkbox className="foo-bar">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox.parentNode).toHaveClass('foo-bar');
	});

	it('should render with the description', () => {
		render(<Checkbox description="This is the description">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAccessibleDescription('This is the description');
	});
});
