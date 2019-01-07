import React, { FunctionComponent } from 'react';
import dog1 from '../../assets/images/dog-1.png';
import dog2 from '../../assets/images/dog-2.png';
import dog3 from '../../assets/images/dog-3.png';
import styles from './styles.module.scss';

const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;
function pickAvatarByEmail(email: string): string {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
}

interface IProps {
  image?: string;
}

export const Header: FunctionComponent<IProps> = ({
  image,
  children = 'Space Explorer',
}) => {
  const token = localStorage.getItem('token');
  if (token) {
    const email = atob(token);
    const avatar = image || pickAvatarByEmail(email);
    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={avatar}
          alt="Space dog"
          style={
            /* stylelint-disable-next-line */
            { borderRadius: !image ? '50%' : undefined }
          }
        />
        <div>
          <h2>{children}</h2>
          <h5 className={styles.subHeading}>{email}</h5>
        </div>
      </div>
    );
  }
  return null;
};

export default Header;
