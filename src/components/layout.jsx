import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Main = styled.main`
  margin-top: 40px;
`;

const Layout = ({ children, user, bookmarks, shoppingCart }) => {
  return (
    <Fragment>
      <Header
        user={user}
        bookmarks={bookmarks}
        shoppingCart={shoppingCart}
      />
        <Main className="container">
          { children }
        </Main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
