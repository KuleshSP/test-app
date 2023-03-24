import React from 'react';
import cx from 'classnames';
import classes from './styles.module.scss';
import {ComponentBaseProps} from 'types/components';

type TypographyProps = {
  variant?: 'p1' | 'p2' | 'h1' | 'h6';
} & React.PropsWithChildren & React.HTMLAttributes<HTMLParagraphElement> & ComponentBaseProps;

const Typography = (props: TypographyProps) => {
  const {children, className, variant = 'p1', ...rest} = props;

  return <p className={cx(classes[variant], className)} {...rest}>{children}</p>;
};

export default Typography;
