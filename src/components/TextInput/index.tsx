import React, {InputHTMLAttributes, ReactElement} from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import Typography from 'components/Typography';
import ErrorMessage from 'components/ErrorMessage';

export type TextInputProps = {
  icon?: ReactElement;
  title?: string;
  error?: string;
} & ComponentBaseProps & InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: TextInputProps): JSX.Element => {
  const {icon, title, error, className, placeholder = 'Search', ...rest} = props;

  return (
    <label className={cx(classes.container, className)}>
      {title && <Typography className={classes.title}>{title}</Typography>}

      <input placeholder={placeholder} type="text" className={classes.input} {...rest} />
      {icon ? React.cloneElement(icon, {className: cx(classes.icon, icon.props.className)}) : null}

      {error ? <ErrorMessage className={classes.error}>{error}</ErrorMessage> : null}
    </label>
  );
};

export default TextInput;
