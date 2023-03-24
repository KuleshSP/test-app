import React, {MouseEventHandler, ReactElement} from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';

type ButtonIconProps = {
  icon: ReactElement;
  handleClick: MouseEventHandler<HTMLButtonElement>;
} & ComponentBaseProps;

const ButtonIcon = (props: ButtonIconProps): JSX.Element => {
  const {className, icon, handleClick} = props;

  return (
    <button onClick={handleClick} className={cx(classes.buttonIcon, className)}>
      {React.cloneElement(icon, {className: cx(classes.icon, icon.props.className)})}
    </button>
  );
};

export default ButtonIcon;
