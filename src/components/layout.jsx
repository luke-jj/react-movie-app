import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Main = styled.main`
`;

const Layout = ({ children, user, bookmarks, shoppingCart }) => (
  <Fragment>
    <Header
      user={user}
      bookmarks={bookmarks}
      shoppingCart={shoppingCart}
    />
      <Main>
        { children }
      </Main>
    <Footer />
  </Fragment>
);

export default Layout;
