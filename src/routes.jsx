import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logout from './actions/logout';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import NotFound from './components/notfound';

import Home from './scenes/home';
import Forum from './scenes/forum';
import Thread from './components/thread';
import ThreadForm from './components/threadform';
import Movies from './scenes/movies';
import MovieDetail from './scenes/moviedetail';
import MovieForm from './components/movieform';
import Reviews from './scenes/reviews';
import Customers from './scenes/customers';
import Rentals from './scenes/rentals';
import Profile from './scenes/profile';
import Bookmarks from './scenes/bookmarks';
import ShoppingCart from './scenes/shoppingcart';

const Routes = ({
  user,
  bookmarks,
  shoppingCart,
  onLike,
  onAddToCart,
  onReset,
  onClear,
  onIncrement,
  onDecrement,
  onDelete
}) => (
  <Switch>
    <Route path="/login" component={LoginForm} />
    <Route path="/register" component={RegisterForm} />
    <Route path="/logout" component={Logout} />
    <Route
      path="/forum/new"
      exact
      render={props => {
        if (!user) {
          return (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          );
        }

        return (
          <ThreadForm {...props} user={user} />
        );
      }}
    />
    <Route
      path="/forum/:id"
      render={props => <Thread {...props} user={user} />}
    />
    <Route
      path="/forum"
      render={props => <Forum {...props} user={user} />}
    />
    <Route
      path="/reviews"
      render={props => <Reviews {...props} user={user} />}
    />
    <Route
      path="/movies/:id"
      render={props => <MovieDetail {...props} user={user} />}
    />
    <Route
      path="/movies/:id/edit"
      render={props => <MovieForm {...props} user={user} />}
    />
    <Route
      path="/movies"
      render={props => {
        return (
          <Movies {...props}
            user={user}
            bookmarks={bookmarks}
            shoppingCart={shoppingCart}
            onLike={onLike}
            onAddToCart={onAddToCart}
          />
        );
      }}
    />
    <Route
      path="/customers"
      render={props => {
        if (!user || !user.isAdmin) {
          return (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          );
        }

        return <Customers {...props} user={user} />;
      }}
    />
    <Route
      path="/rentals"
      render={props => {
        if (!user || !user.isAdmin) {
          return (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          );
        }

        return <Rentals {...props} user={user} />;
      }}
    />
    <Route
      path="/bookmarks"
      render={props => {
        if (!user) {
          return (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          );
        }

        return <Bookmarks {...props} user={user} bookmarks={bookmarks}/>;
      }}
    />
    <Route
      path="/profile"
      render={props => {
        if (!user) {
          return (
            <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          );
        }

        return <Profile {...props} user={user} />;
      }}
    />
    <Route
      path="/cart"
      render={props => {
        return (
          <ShoppingCart
            {...props}
            items={shoppingCart}
            onReset={onReset}
            onClear={onClear}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        );
      }}
    />
    <Route path="/" exact component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
);

Routes.propTypes = {
  user: PropTypes.object,
  bookmarks: PropTypes.array.isRequired,
  shoppingCart: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Routes;
