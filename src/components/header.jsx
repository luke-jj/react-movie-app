import React from 'react';
import Navbar from './navbar';

const Header = ({user, bookmarks, shoppingCart}) => (
  <header>
    <Navbar
      user={user}
      bookmarks={bookmarks}
      shoppingCart={shoppingCart}
    />
  </header>
);

export default Header;
