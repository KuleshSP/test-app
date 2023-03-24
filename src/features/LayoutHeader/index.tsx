import React from 'react';
import {Header, Link} from 'components';
import classes from './styles.module.scss';
import {useRouter} from 'next/router';
import cx from 'classnames';

const LayoutHeader = (): JSX.Element => {
  const router = useRouter();

  const links = [
    {
      href: '/',
      title: 'Products',
    },
    {
      href: '/price-plans',
      title: 'Price plans',
    },
    {
      href: '/pages',
      title: 'Pages',
    },
  ];

  return (
    <Header className={classes.header}>
      {links.map((link) => {
        return (
          <Link
            key={link.href}
            className={cx(classes.headerLink, {
              [classes.activeLink]: router.pathname === link.href,
            })}
            href={link.href}
          >
            {link.title}
          </Link>
        );
      })}
    </Header>
  );
};

export default LayoutHeader;
