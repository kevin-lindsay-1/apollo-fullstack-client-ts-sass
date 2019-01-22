import React from 'react';
import {
  cleanup,
  fireEvent,
  renderApollo,
  waitForElement,
} from '../../test-utils';
import ActionButton, { TOGGLE_CART } from '../action-button';

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const { getByTestId } = renderApollo(<ActionButton />);
    expect(getByTestId('action-button')).toBeTruthy();
  });

  it('shows correct label', () => {
    const { getByText, container } = renderApollo(<ActionButton />);
    getByText(/add to cart/i);

    // rerender with different props to same container
    renderApollo(<ActionButton isInCart={true} />, { container });
    getByText(/remove from cart/i);

    // rerender with different props to same container
    renderApollo(<ActionButton isBooked={true} />, { container });
    getByText(/cancel this trip/i);
  });

  /**
   * This test is a bit tricky, since the button doesn't _render_
   * anything based on the response from the mutation.
   *
   * We test this by only mocking one mutation at a time. If the component
   * tried to execute any mutation not mocked, it would throw an
   * error
   */
  // FIXME: fix test
  xit('fires correct mutation with variables', async () => {
    // if we only provide 1 mock, any other queries would cause error
    const mocks = [
      {
        request: { query: TOGGLE_CART, variables: { launchId: 1 } },
        result: { data: { addOrRemoveFromCart: true } },
      },
    ];

    const { getByTestId } = renderApollo(
      <ActionButton id={1} isBooked={false} />,
      {
        mocks,
      }
    );
    fireEvent.click(getByTestId('action-button'));
    await waitForElement(() => getByTestId('action-button'));
  });
});
