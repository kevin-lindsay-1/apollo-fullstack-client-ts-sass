import React from 'react';
import { cleanup, fireEvent, renderApollo } from '../../test-utils';
import BookTrips, { BOOK_TRIPS, GET_LAUNCH } from '../book-trips';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('book trips', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const { getByTestId } = renderApollo(<BookTrips cartItems={[]} />);
    expect(getByTestId('book-button')).toBeTruthy();
  });

  it('completes mutation and shows message', async () => {
    const mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: [1] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const { getByTestId } = renderApollo(<BookTrips cartItems={[1]} />, {
      mocks,
      addTypename: false,
    });

    fireEvent.click(getByTestId('book-button'));
  });
});
