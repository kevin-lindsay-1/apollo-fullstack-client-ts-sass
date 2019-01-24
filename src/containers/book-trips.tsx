import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from '../components';
import { GET_LAUNCH } from './cart-item';

// export all queries used in this file for testing
export { GET_LAUNCH };
export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID!]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

// TODO: replace with typedef from GQL response
export const BookTrips: FunctionComponent<any> = ({ cartItems }) => (
  <Mutation
    mutation={BOOK_TRIPS}
    variables={{ launchIds: cartItems }}
    refetchQueries={cartItems.map((launchId: string) => ({
      query: GET_LAUNCH,
      variables: { launchId },
    }))}
    update={cache => {
      cache.writeData({ data: { cartItems: [] } });
    }}
  >
    {(bookTrips, { data }) =>
      data && data.bookTrips && !data.bookTrips.success ? (
        <p data-testid="message">{data.bookTrips.message}</p>
      ) : (
        <Button onClick={() => bookTrips()} data-testid="book-button">
          Book All
        </Button>
      )
    }
  </Mutation>
);

export default BookTrips;
