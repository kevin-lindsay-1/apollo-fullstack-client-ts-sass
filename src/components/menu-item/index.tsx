import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

export const MenuItem: FunctionComponent = ({ children }) => (
  <div className={styles.menuItem}>{children}</div>
);

export default MenuItem;

interface ILinkedMenuItemProps {
  to: string;
}

export const LinkedMenuItem: FunctionComponent<ILinkedMenuItemProps> = ({
  to,
  children,
}) => (
  <Link to={to} className={styles.linkedMenuItem}>
    {children}
  </Link>
);
