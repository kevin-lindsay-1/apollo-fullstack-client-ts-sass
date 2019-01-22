import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import { cleanup, renderApollo, waitForElement } from '../../test-utils';
import Cart, { GET_CART_ITEMS } from '../cart';

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    // TODO: why is this necessary
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_CART_ITEMS,
      data: { cartItems: [] },
    });

    const mocks = [
      {
        request: { query: GET_CART_ITEMS },
        result: { data: { cartItems: [] } },
      },
    ];
    const { getByTestId } = renderApollo(<Cart />, { mocks, cache });
    return waitForElement(() => getByTestId('empty-message'));
  });

  it('renders cart', () => {
    // TODO: why is this necessary
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_CART_ITEMS,
      data: { cartItems: [1] },
    });

    const mocks = [
      {
        request: { query: GET_CART_ITEMS },
        result: { data: { cartItems: [1] } },
      },
    ];
    const { getByTestId } = renderApollo(<Cart />, { mocks, cache: undefined });
    return waitForElement(() => getByTestId('empty-message'));
  });
});
