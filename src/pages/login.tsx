import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { LoginForm } from '../components';
import Loading from '../components/loading';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const Login: FunctionComponent = () => (
  <ApolloConsumer>
    {client => (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={({ login }) => {
          localStorage.setItem('token', login);
          client.writeData({ data: { isLoggedIn: true } });
        }}
      >
        {(login, { loading, error }) => {
          // this loading state will probably never show, but it's helpful to
          // have for testing
          if (loading) return <Loading />;
          if (error) return <p>An error occurred</p>;

          return <LoginForm login={login} />;
        }}
      </Mutation>
    )}
  </ApolloConsumer>
);

export default Login;
