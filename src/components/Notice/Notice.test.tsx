import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Notice } from './Notice';

it('should render the notice', () => {
	render(<Notice data-testid="notice">Changes saved</Notice>);

	expect(screen.getByTestId('notice')).toHaveTextContent('Changes saved');
});

it('should render the notice dismiss button', () => {
	render(
		<Notice data-testid="notice" dismissable>
			Changes saved
		</Notice>
	);

	expect(screen.getByRole('button', { name: 'Dismiss notice' })).toBeEnabled();
});

describe('states', () => {
	it('should be dismissed', () => {
		render(
			<Notice data-testid="notice" isDismissed>
				Changes saved
			</Notice>
		);

		expect(screen.queryByTestId('notice')).not.toBeInTheDocument();
	});
});

describe('variants', () => {
	it('should render as "alt" variant', () => {
		render(
			<Notice data-testid="notice" variant="alt">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice-alt', 'notice-info');
	});

	it('should render as info "level" variant', () => {
		render(<Notice data-testid="notice">Changes saved</Notice>);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice', 'notice-info');
	});

	it('should render as success "level" variant', () => {
		render(
			<Notice data-testid="notice" level="success">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice', 'notice-success');
	});

	it('should render as warning "level" variant', () => {
		render(
			<Notice data-testid="notice" level="warning">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice', 'notice-warning');
	});

	it('should render as error "level" variant', () => {
		render(
			<Notice data-testid="notice" level="error">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice', 'notice-error');
	});
});

describe('styles', () => {
	it('should render with the static class', () => {
		render(<Notice data-testid="notice">Changes saved</Notice>);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass(
			'wp-classic-Notice-root',
			'notice',
			'notice-info'
		);
	});

	it('should render with the custom class', () => {
		render(
			<Notice data-testid="notice" className="notice-foo-bar">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveClass('notice-foo-bar');
	});

	it('should render with the inline style', () => {
		render(
			<Notice data-testid="notice" style={{ margin: 100 }}>
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveStyle({
			margin: '100px',
		});
	});
});

describe('attributes', () => {
	it('should render with the "id" attributes', () => {
		render(
			<Notice data-testid="notice" id="notice-2">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).toHaveAttribute('id', 'notice-2');
	});

	it('should not render with invalid html attribute', () => {
		render(
			// @ts-expect-error
			<Notice data-testid="notice" foo="bar">
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');

		expect(notice).not.toHaveAttribute('foo');
	});
});

describe('events', () => {
	it('should dismiss the notice when clicking the dismiss button', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(
			<Notice data-testid="notice" dismissable onDismiss={fn}>
				Changes saved
			</Notice>
		);

		const notice = screen.getByTestId('notice');
		const dismissButton = screen.getByRole('button', {
			name: 'Dismiss notice',
		});

		expect(notice).toBeInTheDocument();
		expect(dismissButton).toBeEnabled();

		await user.click(dismissButton);

		expect(fn).toBeCalledTimes(1);
	});
});
