import React, { FunctionComponent } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './styles.module.scss';

export const Loading: FunctionComponent = () => (
  <Logo className={styles.loading} />
);

export default Loading;
