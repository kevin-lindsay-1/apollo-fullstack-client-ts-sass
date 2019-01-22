import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from '../components';
import { GET_LAUNCH_DETAILS } from '../pages/launch';

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

// TODO: get type information from GQL response
export const ActionButton: FunctionComponent<any> = ({
  isBooked,
  id,
  isInCart,
}) => (
  <Mutation
    mutation={isBooked ? CANCEL_TRIP : TOGGLE_CART}
    variables={{ launchId: id }}
    refetchQueries={[
      {
        query: GET_LAUNCH_DETAILS,
        variables: { launchId: id },
      },
    ]}
  >
    {(mutate, { loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>An error occurred</p>;

      const buttonText = (() => {
        if (isBooked) return 'Cancel This Trip';
        else if (isInCart) return 'Remove from Cart';
        return 'Add to Cart';
      })();

      return (
        <div>
          <Button onClick={() => mutate()} data-testid={'action-button'}>
            {buttonText}
          </Button>
        </div>
      );
    }}
  </Mutation>
);

export default ActionButton;
