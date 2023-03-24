import React from 'react';
import styles from './styles.module.scss';

const LayoutMain = (props: React.PropsWithChildren): JSX.Element => {
  const {children} = props;

  return (
    <main className={styles.layoutMain}>
      {children}
    </main>
  );
};

export default LayoutMain;
