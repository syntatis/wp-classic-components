import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

	it('should render with the inline style', () => {
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

describe('attributes', () => {
	it('should render with the "id" attribute', async () => {
		render(
			<RadioGroup label="For each post in a feed, include" id="radio-group-1">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).toHaveAttribute('id', 'radio-group-1');
	});

	it('should not render with invalid html attribute', async () => {
		render(
			// @ts-expect-error
			<RadioGroup label="For each post in a feed, include" foo="bar">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(
			screen.getByRole('radiogroup', {
				name: 'For each post in a feed, include',
			})
		).not.toHaveAttribute('foo');
	});
});

describe('a11y', () => {
	it('should retain the role', () => {
		render(
			<RadioGroup label="For each post in a feed, include" role="presentation">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		// Role "presentation" does not override the role "radiogroup".
		expect(screen.getByRole('radiogroup')).toBeInTheDocument();
	});

	it('should render with default orientation', () => {
		render(
			<RadioGroup label="For each post in a feed, include">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-orientation',
			'vertical'
		);
	});

	it('should set orientation to horizontal', () => {
		render(
			<RadioGroup
				label="For each post in a feed, include"
				orientation="horizontal"
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-orientation',
			'horizontal'
		);
	});
});

describe('states', () => {
	it('should be checked', async () => {
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
	});

	it('should be checked (by default)', async () => {
		const user = userEvent.setup();

		render(
			<RadioGroup
				label="For each post in a feed, include"
				defaultValue="full-text"
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		const firstRadio = screen.getByRole('radio', { name: 'Full text' });
		const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(secondRadio);

		expect(firstRadio).not.toBeChecked();
		expect(secondRadio).toBeChecked();
	});

	it('should be checked (controlled)', async () => {
		const user = userEvent.setup();

		render(
			<RadioGroup label="For each post in a feed, include" value="full-text">
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		const firstRadio = screen.getByRole('radio', { name: 'Full text' });
		const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(secondRadio);

		expect(firstRadio).toBeChecked(); // Remains to be checked.
		expect(secondRadio).not.toBeChecked();
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
});

describe('events', () => {
	it('should call the "onChange" callback', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(
			<RadioGroup
				label="For each post in a feed, include"
				onChange={fn}
				defaultValue="full-text"
			>
				<Radio value="full-text">Full text</Radio>
				<Radio value="excerpt">Excerpt</Radio>
			</RadioGroup>
		);

		const firstRadio = screen.getByRole('radio', { name: 'Full text' });
		const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

		expect(firstRadio).toBeChecked();
		expect(secondRadio).not.toBeChecked();

		await user.click(secondRadio);

		expect(firstRadio).not.toBeChecked();
		expect(secondRadio).toBeChecked();
		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith('excerpt');
	});
});
