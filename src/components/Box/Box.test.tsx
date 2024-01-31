import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Button', async () => {
	it('should render the content', () => {
		render(<Box>Hello world</Box>);

		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});

	it('should render the title', () => {
		render(<Box title="This is the title">Hello world</Box>);

		expect(
			screen.getByRole('heading', { name: 'This is the title' })
		).toBeInTheDocument();
	});
});
