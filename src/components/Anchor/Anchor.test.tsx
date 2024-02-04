import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Anchor } from './Anchor';

describe('Button', async () => {
	it('should render the link', () => {
		render(<Anchor href="/">Hello world</Anchor>);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).toBeInTheDocument();
	});

	it('should render with the custom class name', () => {
		render(
			<Anchor href="/" className="hello-world">
				Hello world
			</Anchor>
		);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).toHaveClass('hello-world');
	});

	it('should render with the id attribute', () => {
		render(
			<Anchor href="/" id="hello-world-1">
				Hello world
			</Anchor>
		);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).toHaveAttribute('id', 'hello-world-1');
	});
});
