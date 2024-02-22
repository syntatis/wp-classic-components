import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { Icon, wordpress } from '@wordpress/icons';
import { expect, it } from 'vitest';
import Meta, { Default } from './LinkButton.stories';

const LinkButton = composeStory(Default, Meta);

it('should render the component', () => {
	render(<LinkButton />);

	const link = screen.queryByRole('link', { name: 'Go to WordPress' });

	expect(link).toBeInTheDocument();
	expect(link).toHaveClass('button');
	expect(link).toHaveAttribute('href', 'https://wordpress.org');
});

it('should render as "secondary" variant', () => {
	render(<LinkButton variant="secondary" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-secondary']);
});

it('should render "small" size', () => {
	render(<LinkButton size="small" variant="secondary" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-small', 'button-secondary']);
});

it('should render "large" size', () => {
	render(<LinkButton size="large" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-large']);
});

it('should render "hero" size', () => {
	render(<LinkButton size="hero" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-hero']);
});

it('should render with the static class', () => {
	render(<LinkButton />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'wp-classic-LinkButton-root']);
});

it('should render with the custom class name', () => {
	render(<LinkButton className="foo-bar" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass('wp-classic-LinkButton-root', 'foo-bar');
});

it('should render with the inline style', () => {
	render(<LinkButton style={{ width: 50 }} />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveStyle({ width: '50px' });
});

it('should render with the "id"', () => {
	render(<LinkButton id="link-button-2" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveAttribute('id', 'link-button-2');
});

it('should render with the "aria-*" attributes', () => {
	render(
		<LinkButton
			aria-describedby="jetpack-description"
			aria-label="Go to Jetpack"
			href="https://jetpack.com"
		/>
	);

	const link = screen.getByRole('link', { name: 'Go to Jetpack' });

	expect(link).toHaveAttribute('aria-describedby', 'jetpack-description');
	expect(link).toHaveAttribute('href', 'https://jetpack.com');
});

it('should render with the "data-*" label attributes', () => {
	render(<LinkButton data-invalid="true" />);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveAttribute('data-invalid', 'true');
});

it('should render with the prefix', () => {
	render(
		<LinkButton prefix={<Icon data-testid="prefix" icon={wordpress} />} />
	);

	const icon = screen.queryByTestId('prefix');

	expect(icon).toBeInTheDocument();
});

it('should render with the suffix', () => {
	render(
		<LinkButton suffix={<Icon data-testid="suffix" icon={wordpress} />} />
	);

	const icon = screen.queryByTestId('suffix');

	expect(icon).toBeInTheDocument();
});
