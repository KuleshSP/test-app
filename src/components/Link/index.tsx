import React from 'react';
import cx from 'classnames';
import {ComponentBaseProps} from 'types/components';
import classes from './styles.module.scss';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import Typography from 'components/Typography';

type LinkProps = React.PropsWithChildren & ComponentBaseProps & NextLinkProps;

const Link = (props: LinkProps): JSX.Element => {
  const {className, children, ...rest} = props;

  return (
    <NextLink className={cx(classes.link, className)} {...rest}>
      <Typography>
        {children}
      </Typography>
    </NextLink>
  );
};

export default Link;
