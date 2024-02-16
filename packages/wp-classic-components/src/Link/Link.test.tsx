import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { Icon, download, wordpress } from '@wordpress/icons';
import { expect, it } from 'vitest';
import Meta, { Default } from './Link.stories';

const Link = composeStory(Default, Meta);

it('should render the anchor tag', () => {
	render(<Link />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});

	expect(link).toBeInTheDocument();
	expect(link).toHaveAttribute('href', 'https://wordpress.org');
});

it('should render with the static class', () => {
	render(<Link />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass('wp-classic-Link-root');
});

it('should render with the custom class', () => {
	render(<Link href="/" className="hello-world" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass('hello-world');
});

// it('should render with the inline style', () => {
// 	render(
// 		<Link href="/" style={{ margin: 10 }}>
// 			Hello world
// 		</Link>
// 	);

// 	expect(
// 		screen.getByRole('link', {
// 			name: 'Hello world',
// 		})
// 	).toHaveStyle({ margin: '10px' });
// });

// it('should render with the "id" attribute', () => {
// 	render(
// 		<Link href="/" id="hello-world-1">
// 			Hello world
// 		</Link>
// 	);

// 	expect(
// 		screen.getByRole('link', {
// 			name: 'Hello world',
// 		})
// 	).toHaveAttribute('id', 'hello-world-1');
// });

// it('should not render with invalid html attribute', () => {
// 	render(
// 		// @ts-expect-error
// 		<Link href="/" foo="bar">
// 			Hello world
// 		</Link>
// 	);

// 	expect(
// 		screen.getByRole('link', {
// 			name: 'Hello world',
// 		})
// 	).not.toHaveAttribute('foo');
// });

// it('should render with the prefix node', () => {
// 	render(
// 		<Link href="/" prefix={<Icon data-testid="wp-icon" icon={wordpress} />}>
// 			Hello world
// 		</Link>
// 	);

// 	expect(screen.getByTestId('wp-icon')).toBeInTheDocument();
// });

// it('should render with the suffix node', () => {
// 	render(
// 		<Link
// 			href="/"
// 			suffix={<Icon data-testid="wp-icon-download" icon={download} />}
// 		>
// 			Hello world
// 		</Link>
// 	);

// 	expect(screen.getByTestId('wp-icon-download')).toBeInTheDocument();
// });
