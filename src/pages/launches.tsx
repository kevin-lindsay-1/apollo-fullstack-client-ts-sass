import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { Fragment, FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import { Button, Header, LaunchTile } from '../components';
import Loading from '../components/loading';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const Launches: FunctionComponent<RouteComponentProps> = () => (
  <Query query={GET_LAUNCHES}>
    {({ data, loading, error, fetchMore }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR</p>;

      return (
        <Fragment>
          <Header />
          {data.launches &&
            data.launches.launches &&
            // TODO: dynamic typedefs via GQL response
            data.launches.launches.map((launch: any) => (
              <LaunchTile key={launch.id} launch={launch} />
            ))}
          {data.launches && data.launches.hasMore && (
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.launches.cursor,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...fetchMoreResult,
                      launches: {
                        ...fetchMoreResult.launches,
                        launches: [
                          ...prev.launches.launches,
                          ...fetchMoreResult.launches.launches,
                        ],
                      },
                    };
                  },
                })
              }
            >
              Load More
            </Button>
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Launches;
