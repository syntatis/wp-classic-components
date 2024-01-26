import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import { AriaButtonProps, HoverProps, useButton, useFocusRing, useHover } from 'react-aria';
import { useClasses } from '~/hooks';
import classes from './Button.module.scss';

interface ButtonProps extends Omit<AriaButtonProps, 'elementType' | 'target'>, HoverProps {
  children: ReactNode;
  /**
   * The class name to add to the button.
   */
  className?: string;
  /**
   * The inline CSS styles to add to the button.
   */
  style?: CSSProperties;
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
  const { children, type = 'button', variant = 'primary', className, prefix, suffix, autoFocus } = props;
  const { clsx } = useClasses('Button');
  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover(props);
  const { focusProps } = useFocusRing({ autoFocus });
  const hasAffix = !!prefix || !!suffix;

  return (
    <button
      {...filterDOMProps(props)}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      type={type}
      className={clsx('root', [classes.root, `button button-${variant}`, className])}
      data-has-affix={hasAffix || undefined}
    >
      {prefix && <span className={clsx('affix', [clsx('prefix', [classes.prefix]), classes.affix])}>{prefix}</span>}
      {hasAffix ?
        <span className={clsx('affix', [clsx('infix', [classes.infix]), classes.affix])}>{children}</span>
      : children}
      {suffix && <span className={clsx('affix', [clsx('suffix', [classes.suffix]), classes.affix])}>{suffix}</span>}
    </button>
  );
});

Button.displayName = 'Button';
