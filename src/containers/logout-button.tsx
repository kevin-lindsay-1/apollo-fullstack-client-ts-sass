import React, { FunctionComponent } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { LogoutButton } from '../components';

export const LogoutButtonContainer: FunctionComponent = () => (
  <ApolloConsumer>
    {client => (
      <LogoutButton
        onClick={() => {
          client.writeData({ data: { isLoggedIn: false } });
          localStorage.clear();
        }}
      />
    )}
  </ApolloConsumer>
);

export default LogoutButtonContainer;
