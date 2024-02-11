import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

it('should render the checkbox', () => {
	render(<Checkbox>Agree</Checkbox>);

	const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

	expect(checkbox).toBeInTheDocument();
});

it('should render with the description', () => {
	render(<Checkbox description="This is the description">Agree</Checkbox>);

	const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

	expect(checkbox).toHaveAccessibleDescription('This is the description');
});

describe('styles', () => {
	it('should render with the static class', () => {
		render(<Checkbox>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox.parentNode?.parentNode).toHaveClass(
			'wp-classic-Checkbox-root'
		);
	});

	it('should render with the custom class', () => {
		render(<Checkbox className="foo-bar">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox.parentNode?.parentNode).toHaveClass('foo-bar');
	});

	it('should render with the inline styles', () => {
		render(<Checkbox style={{ padding: 30 }}>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox.parentNode?.parentNode).toHaveStyle({ padding: '30px' });
	});
});

describe('attributes', () => {
	it('should render with the "name" attribute', () => {
		render(<Checkbox name="agree">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('name', 'agree');
	});

	it('should render with the "id" attribute', () => {
		render(<Checkbox id="tos-agreement">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('id', 'tos-agreement');
	});

	it('should not render with invalid html attribute', () => {
		// @ts-expect-error
		render(<Checkbox foo="bar">Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).not.toHaveAttribute('foo');
	});
});

describe('a11y', () => {
	it('should be excluded from tab order', () => {
		render(<Checkbox excludeFromTabOrder>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('tabindex', '-1');
	});
});

describe('states', () => {
	it('should be checked', async () => {
		render(<Checkbox>Agree</Checkbox>);

		const user = userEvent.setup();
		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		await user.click(checkbox);

		expect(checkbox).toBeChecked();
	});

	it('should be checked (by default)', () => {
		render(<Checkbox defaultSelected>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeChecked();
	});

	it('should be checked (controlled)', () => {
		render(<Checkbox isSelected>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeChecked();
	});

	it('should be readonly', () => {
		render(<Checkbox isReadOnly>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toHaveAttribute('aria-readonly', 'true');
	});

	it('should be disabled', () => {
		render(<Checkbox isDisabled>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeDisabled();
	});

	it('should be checked on click', async () => {
		render(<Checkbox name="agree">Agree</Checkbox>);

		const user = userEvent.setup();
		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).not.toBeChecked();
		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	it('should be unchecked on click', async () => {
		render(
			<Checkbox name="agree" defaultSelected>
				Agree
			</Checkbox>
		);

		const user = userEvent.setup();
		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		expect(checkbox).toBeChecked();
		await user.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});
});

describe('events', () => {
	it('should call the "onChange" callback', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(<Checkbox onChange={fn}>Agree</Checkbox>);

		const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

		await user.click(checkbox);

		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith(true);

		await user.click(checkbox);

		expect(fn).toBeCalledTimes(2);
		expect(fn).toBeCalledWith(false);
	});
});
