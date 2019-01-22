import { InMemoryCache } from 'apollo-cache-inmemory';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import React from 'react';
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils';
import { render } from 'react-testing-library';

interface IRenderApolloOptions {
  mocks?: ReadonlyArray<MockedResponse>;
  addTypename?: boolean;
  defaultOptions?: {};
  cache?: InMemoryCache;
  container?: HTMLElement;
}

const renderApollo = (
  node: Node | JSX.Element,
  {
    mocks,
    addTypename,
    defaultOptions,
    cache,
    ...options
  }: IRenderApolloOptions = {
    mocks: [],
    addTypename: false,
    defaultOptions: {},
    cache: new InMemoryCache(),
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
