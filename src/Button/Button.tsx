import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { clsx } from 'clsx';
import { ReactNode, forwardRef } from 'react';
import { AriaButtonProps, HoverProps, useButton } from 'react-aria';
import classes from './Button.module.scss';

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

  /**
   * Additional element to add before the button label.
   */
  prefix?: ReactNode;

  /**
   * Additional element to add after the button label.
   */
  suffix?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  const { children, type = 'button', variant = 'primary', className, prefix, suffix } = props;
  const { buttonProps } = useButton(props, ref);
  const hasSuffix = !!prefix || !!suffix;

  return (
    <button
      {...filterDOMProps(props)}
      {...buttonProps}
      type={type}
      className={clsx(`button button-${variant}`, className, classes.root)}
      data-has-affix={hasSuffix || undefined}
    >
      {prefix && <span className={clsx(classes.affix, classes.prefix)}>{prefix}</span>}
      {hasSuffix ? <span className={clsx(classes.affix, classes.infix)}>{children}</span> : children}
      {suffix && <span className={clsx(classes.affix, classes.suffix)}>{suffix}</span>}
    </button>
  );
});

Button.displayName = 'Button';
