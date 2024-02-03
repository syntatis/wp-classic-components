import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';
import { Button } from '../Button';

describe('Button', async () => {
	it('should render the content', () => {
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
		const user = userEvent.setup();
		const button = screen.getByRole('button', { name: 'Toggle panel' });

		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();

		const content = screen.getByText('This is the content of the box');

		expect(content).toBeVisible();
		await user.click(button);
		expect(content).not.toBeVisible();
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
});
