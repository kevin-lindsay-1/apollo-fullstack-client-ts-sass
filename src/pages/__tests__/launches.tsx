import React from 'react';
import { cleanup, renderApollo, waitForElement } from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

// FIXME: fix test
xdescribe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            isLoggedIn: true,
            launches: { cursor: '123', hasMore: true, launches: [mockLaunch] },
          },
        },
      },
    ];
    const { getByText } = renderApollo(<Launches />, {
      mocks,
    });
    await waitForElement(() => getByText(/test mission/i));
  });
});
