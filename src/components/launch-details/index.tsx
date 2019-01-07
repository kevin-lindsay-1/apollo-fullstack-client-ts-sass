import React, { FunctionComponent } from 'react';
import { getBackgroundImage } from '../launch-tile';
import styles from './styles.module.scss';

// TODO: get type information from GraphQL response
export const LaunchDetails: FunctionComponent<any> = ({ id, site, rocket }) => (
  <div
    className={styles.launchDetails}
    style={{
      backgroundImage: getBackgroundImage(id),
    }}
  >
    <h3>
      {rocket.name} ({rocket.type})
    </h3>
    <h5>{site}</h5>
  </div>
);

export default LaunchDetails;
