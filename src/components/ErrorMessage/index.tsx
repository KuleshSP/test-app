import React from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import Typography from 'components/Typography';

type ErrorMessageProps = React.PropsWithChildren & ComponentBaseProps;

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const {className, children} = props;

  return (
    <Typography className={cx(classes.errorMessage, className)}>
      {children}
    </Typography>
  );
};

export default ErrorMessage;
