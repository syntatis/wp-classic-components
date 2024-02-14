import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';
import { Button } from '../Button';

it('should render the box', () => {
	render(<Box>Hello world</Box>);

	expect(screen.getByText('Hello world')).toBeInTheDocument();
});

it('should render with the title', () => {
	render(<Box title="This is the title">Hello world</Box>);

	expect(
		screen.getByRole('heading', { name: 'This is the title' })
	).toBeInTheDocument();
});

it('should render with the toggle button', async () => {
	render(<Box collapsible>This is the content of the box</Box>);
	const button = screen.getByRole('button', { name: 'Toggle panel' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render with the footer', () => {
	render(
		<Box footer={<Button>Save changes</Button>}>
			This is the content of the box
		</Box>
	);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
});

describe('styles', () => {
	it('should render with the static class', () => {
		render(<Box data-testid="box-1">This is the content of the box</Box>);

		expect(screen.getByTestId('box-1')).toHaveClass(
			'wp-classic-Box-root',
			'postbox'
		);
	});

	it('should render with the custom class name', () => {
		render(
			<Box data-testid="box-1" className="box-1-class-name">
				This is the content of the box
			</Box>
		);

		expect(screen.getByTestId('box-1')).toHaveClass('box-1-class-name');
	});

	it('should render with the inline style', () => {
		render(
			<Box data-testid="box-1" style={{ padding: 20 }}>
				This is the content of the box
			</Box>
		);

		expect(screen.getByTestId('box-1')).toHaveStyle({
			padding: '20px',
		});
	});
});

describe('attributes', () => {
	it('should render with the "id attributes"', () => {
		render(
			<Box data-testid="box-1" id="box-1-id">
				This is the content of the box
			</Box>
		);

		expect(screen.getByTestId('box-1')).toHaveAttribute('id', 'box-1-id');
	});

	it('should not render with invalid html attribute', () => {
		render(
			// @ts-expect-error
			<Box data-testid="box-1" foo="bar">
				This is the content of the box
			</Box>
		);

		expect(screen.getByTestId('box-1')).not.toHaveAttribute('foo');
	});
});

describe('events', () => {
	it('should not render the content when toggled off', async () => {
		const user = userEvent.setup();

		render(
			<Box data-testid="box-1" collapsible>
				This is the content of the box
			</Box>
		);

		const button = screen.getByRole('button', { name: 'Toggle panel' });
		const content = screen.getByText('This is the content of the box');

		expect(content).toBeVisible();
		await user.click(button);
		expect(content).not.toBeVisible();
	});
});
