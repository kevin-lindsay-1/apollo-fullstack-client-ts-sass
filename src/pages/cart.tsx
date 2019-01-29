import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { Fragment, FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import { Header } from '../components';
import Loading from '../components/loading';
import { BookTrips, CartItem } from '../containers';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const Cart: FunctionComponent<RouteComponentProps> = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR: {error.message}</p>;
      return (
        <Fragment>
          <Header>My Cart</Header>
          {!data.cartItems || !data.cartItems.length ? (
            <p data-testid="empty-message">No items in your cart</p>
          ) : (
            <Fragment>
              {data.cartItems.map((launchId: string) => (
                <CartItem key={launchId} launchId={launchId} />
              ))}
              <BookTrips cartItems={data.cartItems} />
            </Fragment>
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Cart;
