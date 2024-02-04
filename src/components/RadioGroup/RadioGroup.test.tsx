import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

it('should render the radio input', () => {
	render(
		<RadioGroup label="For each post in a feed, include">
			<Radio value="full-text">Full text</Radio>
			<Radio value="excerpt">Excerpt</Radio>
		</RadioGroup>
	);

	expect(screen.getByRole('radio', { name: 'Full text' })).toBeInTheDocument();
	expect(screen.getByRole('radio', { name: 'Excerpt' })).toBeInTheDocument();
});

it('should render with the description', () => {
	render(
		<RadioGroup
			label="For each post in a feed, include"
			description="The length of text to display on the feed"
		>
			<Radio value="full-text">Full text</Radio>
			<Radio value="excerpt">Excerpt</Radio>
		</RadioGroup>
	);

	expect(
		screen.getByRole('radiogroup', { name: 'For each post in a feed, include' })
	).toHaveAccessibleDescription('The length of text to display on the feed');
});

describe('styles', () => {
	it('should render with the static class', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				description="The length of text to display on the feed"
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).toHaveClass('wp-classic-RadioGroup-root');

		screen.getAllByRole('radio').forEach((radio) => {
			expect(radio).toHaveClass('wp-classic-Radio-input');
			expect(radio.parentNode).toHaveClass('wp-classic-Radio-root');
		});
	});

	it('should render with the custom class', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				description="The length of text to display on the feed"
				className="radio-group-class"
			>
				<Radio value="full-text" className="radio-item-class">
					Full text
				</Radio>
				<Radio value="excerpt" className="radio-item-class">
					Excerpt
				</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).toHaveClass('radio-group-class');

		screen.getAllByRole('radio').forEach((radio) => {
			expect(radio.parentNode).toHaveClass('radio-item-class');
		});
	});

	it('should render with inline style', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				description="The length of text to display on the feed"
				style={{ margin: 15 }}
			>
				<Radio
					value="full-text"
					className="radio-item-class"
					style={{ padding: 10 }}
				>
					Full text
				</Radio>
				<Radio
					value="excerpt"
					className="radio-item-class"
					style={{ padding: 10 }}
				>
					Excerpt
				</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).toHaveStyle({
			margin: '15px',
		});

		screen.getAllByRole('radio').forEach((radio) => {
			expect(radio.parentNode).toHaveStyle({
				padding: '10px',
			});
		});
	});
});

describe('states', () => {
	it('should be checked by default', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				defaultValue="full-text"
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(screen.getByRole('radio', { name: 'Full text' })).toBeChecked();
		expect(screen.getByRole('radio', { name: 'Excerpt' })).not.toBeChecked();
	});

	it('should be disabled', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				defaultValue="full-text"
				isDisabled
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(screen.getByRole('radio', { name: 'Full text' })).toBeDisabled();
		expect(screen.getByRole('radio', { name: 'Excerpt' })).toBeDisabled();
	});

	it('should be readonly', async () => {
		const user = userEvent.setup();

		render(
			<RadioGroup
				label="For each post in a feed, include"
				defaultValue="full-text"
				isReadOnly
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).toHaveAttribute('aria-readonly', 'true');

		const firstRadio = screen.getByRole('radio', { name: 'Full text' });
		const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(secondRadio);

		expect(secondRadio).not.toBeChecked();
	});

	it('should be required', () => {
		render(
			<RadioGroup label="For each post in a feed, include" isRequired>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				// Has the asterisk.
				name: 'For each post in a feed, include *',
			})
		).toHaveAttribute('aria-required', 'true');
	});

	it('should be checked between inputs on click', async () => {
		const user = userEvent.setup();

		render(
			<RadioGroup label="For each post in a feed, include">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		const firstRadio = screen.getByRole('radio', { name: 'Full text' });
		const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

		expect(firstRadio).not.toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(firstRadio);

		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(secondRadio);

		expect(firstRadio).not.toBeChecked();
		expect(secondRadio).toBeChecked();
	});
});
