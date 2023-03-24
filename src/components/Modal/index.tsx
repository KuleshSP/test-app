import React from 'react';
import cx from 'classnames';
import classes from './styles.module.scss';
import {ComponentBaseProps} from 'types/components';
import Backdrop from 'components/Backdrop';
import {ITimes} from 'icons';
import ButtonIcon from 'components/ButtonIcon';

export type ModalProps = {
  handleClose: () => void;
} & React.PropsWithChildren & ComponentBaseProps;

const Modal = (props: ModalProps) => {
  const {children, className, handleClose} = props;

  return (
    <Backdrop handleClick={handleClose}>
      <div className={cx(classes.modal, className)}>
        {children}

        <ButtonIcon
          className={classes.closeButton}
          handleClick={handleClose}
          icon={<ITimes />}
        />
      </div>
    </Backdrop>
  );
};

export default Modal;
