import React from 'react';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import cx from 'classnames';

type HeaderProps = React.PropsWithChildren & ComponentBaseProps;

const Header = (props: HeaderProps): JSX.Element => {
  const {className, children} = props;

  return (
    <header className={classes.header}>
      <div className={cx(classes.headerContent, className)}>{children}</div>
    </header>
  );
};

export default Header;
