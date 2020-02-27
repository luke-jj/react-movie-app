import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

Layout.propTypes = {
  user: PropTypes.object,
  bookmarks: PropTypes.array.isRequired,
  shoppingCart: PropTypes.array.isRequired
};

export default Layout;
