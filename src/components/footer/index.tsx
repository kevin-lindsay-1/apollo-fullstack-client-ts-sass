import React, { FunctionComponent } from 'react';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import LogoutButton from '../../containers/logout-button';
import { LinkedMenuItem } from '../menu-item';
import styles from './styles.module.scss';

export const Footer: FunctionComponent = () => (
  <footer className={styles.container}>
    <div className={styles.innerContainer}>
      <LinkedMenuItem to="/">
        <HomeIcon />
        Home
      </LinkedMenuItem>
      <LinkedMenuItem to="/cart">
        <CartIcon />
        Cart
      </LinkedMenuItem>
      <LinkedMenuItem to="/profile">
        <ProfileIcon />
        Profile
      </LinkedMenuItem>
      <LogoutButton />
    </div>
  </footer>
);

export default Footer;
