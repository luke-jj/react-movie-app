import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, user, bookmarks, shoppingCart }) => {
  return (
    <React.Fragment>
      <Header
        user={user}
        bookmarks={bookmarks}
        shoppingCart={shoppingCart}
      />

        <main className="container">
          { children }
        </main>

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
