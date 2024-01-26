import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', async () => {
  it('should render the button', () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button).toBeInTheDocument();
  });

  it('should render the button with the static class', () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button.classList.contains('button')).toBe(true);
    expect(button.classList.contains('button-primary')).toBe(true);
  });

  it('should render the button with the custom class name', () => {
    render(<Button className="foo-bar">Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button.classList.contains('foo-bar')).toBe(true);
  });

  it('should render the button with the "secondary" variant class name', () => {
    render(<Button variant="secondary">Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button.classList.contains('button-secondary')).toBe(true);
  });
});
