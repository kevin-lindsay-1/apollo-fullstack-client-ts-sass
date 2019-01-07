import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import styles from './styles.module.scss';

export const Button: FunctionComponent<ButtonHTMLAttributes<{}>> = ({
  type = 'button',
  children,
  ...props
}) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);

export default Button;
