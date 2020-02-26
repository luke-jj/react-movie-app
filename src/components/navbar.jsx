import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavIcon = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;

  i {
    font-size: 18px;
    padding-right: 3px;
  }
`;

const Navbar = ({ shoppingCart, user }) => {
  const navClasses = (!user || !user.isAdmin)
    ? "nav-item nav-link disabled"
    : "nav-item nav-link";

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Vidi-O</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span><i className="fa fa-bars"></i></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/reviews">
            Reviews
          </NavLink>
          <NavLink className="nav-item nav-link" to="/forum">
            Forum
          </NavLink>
          <NavLink className={navClasses} to="/customers">
            Customers
          </NavLink>
          <NavLink className={navClasses} to="/rentals">
            Rentals
          </NavLink>
        </div>
        <div className="navbar-nav ml-auto">
          <NavIcon className="nav-item nav-link" to="/bookmarks">
            <i className="fa fa-bookmark"></i> {' '}
            Watchlist
          </NavIcon>
          <NavIcon className="nav-item nav-link" to="/cart">
            <i
              className="fa fa-shopping-cart text-success"
              aria-hidden="true"
            >
            </i>
            <span className="badge badge-pill badge-success">
              { shoppingCart.filter(c => c.amount > 0).length }
            </span>
          </NavIcon>
          { user ? (
            <Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                <button className="btn btn-sm btn-dark" tabIndex="-1">
                  <span><i className="fa fa-user-circle-o "></i></span>
                  {' '}
                  { user.name }
                </button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                <button className="btn btn-sm btn-dark" tabIndex="-1">
                  Logout
                </button>
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <button
                  className="btn btn-sm btn-outline-primary "
                  tabIndex="-1"
                >
                  Login
                </button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                <button className="btn btn-sm btn-danger" tabIndex="-1">
                  Sign Up
                </button>
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
