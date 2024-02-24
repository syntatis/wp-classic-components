import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Meta, { Default } from './Spinner.stories';

const Spinner = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Spinner data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toBeInTheDocument();
	expect(spinner).toHaveRole('status');
	expect(spinner).toHaveTextContent('Loading');
});

it('should render with the static class', () => {
	render(<Spinner data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveClass('wp-classic-Spinner-root');
});

it('should render with the custom class name', () => {
	render(<Spinner className="content-spinner" data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveClass('wp-classic-Spinner-root', 'content-spinner');
});

it('should render with the inline style', () => {
	render(<Spinner data-testid="spinner" style={{ marginBottom: 10 }} />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveStyle({
		'margin-bottom': '10px',
	});
});

it('should render with the "id" attribute', () => {
	render(<Spinner data-testid="spinner" id="spinner-1" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveAttribute('id', 'spinner-1');
});

it('should not render invalid html attributes', async () => {
	// @ts-expect-error
	render(<Spinner data-testid="spinner" foo="bar" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).not.toHaveAttribute('foo');
});
