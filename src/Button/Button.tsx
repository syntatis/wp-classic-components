import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { clsx } from 'clsx';
import { ReactNode, forwardRef } from 'react';
import { AriaButtonProps, HoverProps, useButton } from 'react-aria';

interface ButtonProps extends Omit<AriaButtonProps, 'elementType' | 'target'>, HoverProps {
  children: ReactNode;

  /**
   * The class name to add to the button.
   */
  className?: string;

  /**
   * The variant of the button.
   *
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  const { children, variant = 'primary', className } = props;
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...filterDOMProps(props)} {...buttonProps} className={clsx(`button button-${variant}`, className)}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
