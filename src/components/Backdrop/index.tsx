import React from 'react';
import cx from 'classnames';
import classes from './styles.module.scss';
import {ComponentBaseProps} from 'types/components';

type BackdropProps = {
  handleClick: () => void;
} & React.PropsWithChildren & ComponentBaseProps;

const Backdrop = (props: BackdropProps) => {
  const {children, className, handleClick} = props;

  return (
    <div
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) return;

        handleClick();
      }}
      className={cx(classes.backdrop, className)}
    >
      {children}
    </div>
  );
};

export default Backdrop;
