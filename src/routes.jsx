import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Logout from './actions/logout';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import NotFound from './components/notfound';

import Forum from './scenes/forum';
import Thread from './components/thread';
import ThreadForm from './components/threadform';
import Movies from './scenes/movies';
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
    <Redirect from="/" exact to="/movies" />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;
