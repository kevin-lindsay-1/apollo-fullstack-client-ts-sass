import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { Fragment, FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import { Header, LaunchTile } from '../components';
import Loading from '../components/loading';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const Profile: FunctionComponent<RouteComponentProps> = () => (
  <Query query={GET_MY_TRIPS} fetchPolicy="network-only">
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR: {error.message}</p>;

      return (
        <Fragment>
          <Header>My Trips</Header>
          {data.me.trips.length ? (
            // TODO: use dynamic typedefs via GQL response
            data.me.trips.map((launch: any) => (
              <LaunchTile key={launch.id} launch={launch} />
            ))
          ) : (
            <p>You haven't booked any trips</p>
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Profile;
