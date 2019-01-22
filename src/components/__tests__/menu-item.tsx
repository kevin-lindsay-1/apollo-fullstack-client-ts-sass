import React from 'react';
import { cleanup, render } from '../../test-utils';
import MenuItem, { LinkedMenuItem } from '../menu-item';

describe('MenuItem', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<MenuItem />);
  });
});

describe('LinkedMenuItem', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<LinkedMenuItem to="/wow" />);
  });
});
