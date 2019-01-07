import React, { FunctionComponent, MouseEvent } from 'react';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import styles from './styles.module.scss';

interface IProps {
  type?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const LogoutButton: FunctionComponent<IProps> = ({
  type = 'button',
  ...props
}) => (
  <button type={type} className={styles.logoutButton} {...props}>
    <ExitIcon />
    Logout
  </button>
);

export default LogoutButton;
