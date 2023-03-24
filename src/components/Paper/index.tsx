import React from 'react';
import cx from 'classnames';
import classes from './styles.module.scss';

type PaperProps = React.PropsWithChildren & {
  classNames?: string;
}

const Paper = (props: PaperProps) => {
  const {children, classNames} = props;

  return <div className={cx(classes.paper, classNames)}>{children}</div>;
};

export default Paper;
