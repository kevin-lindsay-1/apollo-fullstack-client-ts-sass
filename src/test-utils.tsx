import { InMemoryCache } from 'apollo-cache-inmemory';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { render } from 'react-testing-library';

const renderApollo = (
  node: Node,
  {
    mocks = [],
    addTypename = false,
    defaultOptions = {},
    cache = new InMemoryCache(),
    ...options
  }
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    options
  );
};

export * from 'react-testing-library';
export { renderApollo };
