import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ totalCounters, user }) => {
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
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          {' '}
          <span className="badge badge-pill badge-secondary">
            {totalCounters}
          </span>
        </NavLink>
        <NavLink className="nav-item nav-link" to="/forum/posts">
          Forum
        </NavLink>
        { !user &&
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        }
        { user &&
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              { user.name }
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        }
      </div>
    </nav>
  );
}

export default Navbar;
