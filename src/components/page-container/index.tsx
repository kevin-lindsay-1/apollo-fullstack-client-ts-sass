import React, { Fragment, FunctionComponent } from 'react';
import styles from './styles.module.scss';

export const PageContainer: FunctionComponent = ({ children }) => (
  <Fragment>
    <div className={styles.bar} />
    <div className={styles.container}>{children}</div>
  </Fragment>
);

export default PageContainer;
