import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ totalCounters, user }) => {
  const navClasses = (!user || !user.isAdmin)
    ? "nav-item nav-link disabled"
    : "nav-item nav-link";

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <Link className="navbar-brand" to="/">Video</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
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
          <NavLink className="nav-item nav-link" to="/cart">
            <i className="fa fa-shopping-cart text-success align-middle" aria-hidden="true"></i>
            {' '}
            <span className="badge badge-pill badge-success align-middle">
              {totalCounters}
            </span>
          </NavLink>
          { !user &&
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <button className="btn btn-sm btn-outline-primary ">
                  Login
                </button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                <button className="btn btn-sm btn-danger">
                  Sign Up
                </button>
              </NavLink>
            </React.Fragment>
          }
          { user &&
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                <button className="btn btn-sm btn-light">
                  { user.name }
                </button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                <button className="btn btn-sm btn-light">
                  Logout
                </button>
              </NavLink>
            </React.Fragment>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
