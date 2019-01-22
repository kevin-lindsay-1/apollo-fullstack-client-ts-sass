import React from 'react';
import { cleanup, render } from '../../test-utils';
import LaunchDetails from '../launch-details';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(
      <LaunchDetails
        id={1}
        site={'earth'}
        rocket={{ name: 'that one', type: 'big' }}
      />
    );
  });
});
