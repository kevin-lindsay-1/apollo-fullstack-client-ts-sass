import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import galaxy from '../../assets/images/galaxy.jpg';
import iss from '../../assets/images/iss.jpg';
import moon from '../../assets/images/moon.jpg';
import styles from './styles.module.scss';

const backgrounds = [galaxy, iss, moon];
export function getBackgroundImage(id: number) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

// TODO: get type information from GraphQL response
export const LaunchTile: FunctionComponent<any> = ({ launch }) => {
  const { id, mission, rocket } = launch;
  return (
    <Link
      to={`/launch/${id}`}
      className={styles.launchTile}
      style={{
        backgroundImage: getBackgroundImage(id),
      }}
    >
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </Link>
  );
};

export default LaunchTile;
