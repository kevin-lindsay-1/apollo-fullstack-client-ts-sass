import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import LaunchTile from '../components/launch-tile';
import { LAUNCH_TILE_DATA } from '../pages/launches';

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const CartItem: FunctionComponent<any> = ({ launchId }) => (
  <Query query={GET_LAUNCH} variables={{ launchId }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR: {error.message}</p>;
      return data && <LaunchTile launch={data.launch} />;
    }}
  </Query>
);

export default CartItem;
