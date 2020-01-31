import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand" to="/">Video</Link>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        <NavLink className="nav-item nav-link" to="/cart">
          Shopping Cart {' '}
          <span className="badge badge-pill badge-secondary">
            {totalCounters}
          </span>
        </NavLink>
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
