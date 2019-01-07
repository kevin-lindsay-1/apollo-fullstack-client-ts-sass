import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { Fragment, FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import { Header, LaunchDetails } from '../components';
import Loading from '../components/loading';
import { ActionButton } from '../containers';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

// TODO: replace with dynamic definition from GQL response
interface IProps {
  launchId: string;
}

export const Launch: FunctionComponent<RouteComponentProps<IProps>> = ({
  launchId,
}) => (
  <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR: {error.message}</p>;

      return (
        <Fragment>
          <Header image={data.launch.mission.missionPatch}>
            {data.launch.mission.name}
          </Header>
          <LaunchDetails {...data.launch} />
          <ActionButton {...data.launch} />
        </Fragment>
      );
    }}
  </Query>
);

export default Launch;
