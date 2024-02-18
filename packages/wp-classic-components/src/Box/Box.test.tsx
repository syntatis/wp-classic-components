import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';

import { Button } from '../Button';
import Meta, { Default } from './Box.stories';

const Box = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Box />);

	expect(
		screen.getByText(
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.'
		)
	).toBeInTheDocument();
});

it('should render with the title', () => {
	render(<Box title="Site Health" />);

	expect(
		screen.getByRole('heading', { name: 'Site Health' })
	).toBeInTheDocument();
});

it('should render with the toggle button', async () => {
	render(<Box collapsible />);

	const button = screen.getByRole('button', { name: 'Toggle panel' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render with the footer', () => {
	render(<Box footer={<Button>Save changes</Button>} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render with the static class', () => {
	render(<Box data-testid="box" />);

	expect(screen.getByTestId('box')).toHaveClass(
		'wp-classic-Box-root',
		'postbox'
	);
});

it('should render with the custom class name', () => {
	render(<Box className="box-1-class-name" data-testid="box" />);

	expect(screen.getByTestId('box')).toHaveClass('box-1-class-name');
});

it('should render with the inline style', () => {
	render(<Box data-testid="box" style={{ padding: 20 }} />);

	expect(screen.getByTestId('box')).toHaveStyle({
		padding: '20px',
	});
});

it('should render with the "id" attributes', () => {
	render(<Box data-testid="box" id="box-1" />);

	expect(screen.getByTestId('box')).toHaveAttribute('id', 'box-1');
});

it('should not render with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<Box data-testid="box" foo="bar" />
	);

	expect(screen.getByTestId('box')).not.toHaveAttribute('foo');
});

it('should not render the content when toggled off', async () => {
	const user = userEvent.setup();

	render(
		<Box collapsible data-testid="box">
			This is the content of the box
		</Box>
	);

	const button = screen.getByRole('button', { name: 'Toggle panel' });
	const content = screen.getByText('This is the content of the box');

	expect(content).toBeVisible();

	await user.click(button);

	expect(content).not.toBeVisible();
});
