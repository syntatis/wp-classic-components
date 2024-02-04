import { render, screen } from '@testing-library/react';
import { Icon, download, wordpress } from '@wordpress/icons';
import { describe, expect, it } from 'vitest';
import { Anchor } from './Anchor';

it('should render the link', () => {
	render(<Anchor href="/">Hello world</Anchor>);

	expect(
		screen.getByRole('link', {
			name: 'Hello world',
		})
	).toBeInTheDocument();
});

describe('styles', () => {
	it('should render with the static class', () => {
		render(<Anchor href="/">Hello world</Anchor>);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).toHaveClass('wp-classic-Anchor-root');
	});

	it('should render with the custom class', () => {
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

	it('should render with the inline style', () => {
		render(
			<Anchor href="/" style={{ margin: 10 }}>
				Hello world
			</Anchor>
		);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).toHaveStyle({ margin: '10px' });
	});
});

describe('attributes', () => {
	it('should render with the "id" attribute', () => {
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

	it('should not render with invalid html attribute', () => {
		render(
			// @ts-expect-error
			<Anchor href="/" foo="bar">
				Hello world
			</Anchor>
		);

		expect(
			screen.getByRole('link', {
				name: 'Hello world',
			})
		).not.toHaveAttribute('foo');
	});
});

describe('affix', () => {
	it('should render with the prefix node', () => {
		render(
			<Anchor href="/" prefix={<Icon data-testid="wp-icon" icon={wordpress} />}>
				Hello world
			</Anchor>
		);

		expect(screen.getByTestId('wp-icon')).toBeInTheDocument();
	});

	it('should render with the suffix node', () => {
		render(
			<Anchor
				href="/"
				suffix={<Icon data-testid="wp-icon-download" icon={download} />}
			>
				Hello world
			</Anchor>
		);

		expect(screen.getByTestId('wp-icon-download')).toBeInTheDocument();
	});
});
