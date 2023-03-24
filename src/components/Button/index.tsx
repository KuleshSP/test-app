import React, {ButtonHTMLAttributes} from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import Typography from 'components/Typography';

type ButtonProps = React.PropsWithChildren & ComponentBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps): JSX.Element => {
  const {className, children, ...rest} = props;

  return (
    <button className={cx(classes.button, className)} {...rest}>
      {typeof children === 'string' ? <Typography className={classes.buttonTitle}>{children}</Typography> : <>{children}</>}
    </button>
  );
};

export default Button;
