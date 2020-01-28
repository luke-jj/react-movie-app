import React from 'react';

const Navbar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a href="#1" className="navbar-brand">Navbar</a>
      <span className="badge badge-pill badge-secondary">{totalCounters}</span>
    </nav>
  );
}

export default Navbar;
