import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LinkButton } from './LinkButton';

it('should render the component', () => {
	render(<LinkButton href="https://wordpress.org">Go to WordPress</LinkButton>);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toBeInTheDocument();
	expect(link).toBeEnabled();
	expect(link).toHaveClass('button');
	expect(link).toHaveAttribute('href', 'https://wordpress.org');
});

it('should render as "secondary" variant', () => {
	render(
		<LinkButton variant="secondary" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-secondary']);
});

it('should render "small" size', () => {
	render(
		<LinkButton size="small" variant="secondary" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-small', 'button-secondary']);
});

it('should render "large" size', () => {
	render(
		<LinkButton size="large" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-large']);
});

it('should render "hero" size', () => {
	render(
		<LinkButton size="hero" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'button-hero']);
});

it('should render with the static class', () => {
	render(<LinkButton href="https://wordpress.org">Go to WordPress</LinkButton>);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass(...['button', 'wp-classic-LinkButton-root']);
});

it('should render with the custom class name', () => {
	render(
		<LinkButton className="foo-bar" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveClass('wp-classic-LinkButton-root', 'foo-bar');
});

it('should render with the inline style', () => {
	render(
		<LinkButton style={{ width: 50 }} href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveStyle({ width: '50px' });
});

it('should render with the "id"', () => {
	render(
		<LinkButton id="link-button-2" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveAttribute('id', 'link-button-2');
});

it('should render with the "aria-*" attributes', () => {
	render(
		<LinkButton
			href="https://jetpack.com"
			aria-label="Go to Jetpack"
			aria-describedby="jetpack-description"
		/>
	);

	const link = screen.getByRole('link', { name: 'Go to Jetpack' });

	expect(link).toHaveAttribute('aria-describedby', 'jetpack-description');
	expect(link).toHaveAttribute('href', 'https://jetpack.com');
});

it('should render with the "data-*" label attributes', () => {
	render(
		<LinkButton data-invalid="true" href="https://wordpress.org">
			Go to WordPress
		</LinkButton>
	);

	const link = screen.getByRole('link', { name: 'Go to WordPress' });

	expect(link).toHaveAttribute('data-invalid', 'true');
});
