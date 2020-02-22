import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookmarks, createBookmark, deleteBookmark } from './services/bookmarkService';
import logger from './services/logService';
import auth from './services/authService';

import Layout from './components/layout';
import Logout from './actions/logout';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import NotFound from './components/notfound';

import Movies from './scenes/movies';
import MovieForm from './components/movieform';
import Reviews from './scenes/reviews';
import Forum from './scenes/forum';
import Thread from './components/thread';
import ThreadForm from './components/threadform';
import Customers from './scenes/customers';
import Rentals from './scenes/rentals';
import Profile from './scenes/profile';
import Bookmarks from './scenes/bookmarks';
import ShoppingCart from './scenes/shoppingcart';

class App extends Component {

  state = {
    shoppingCart: [],
    bookmarks: [],
    user: null,
  };

  async componentDidMount() {
    const state = {};
    state.user = auth.getCurrentUser();
    state.bookmarks = await this.populateBookmarks(state.user);
    state.shoppingCart = this.populateShoppingCart();
    this.setState(state);
  }

  async populateBookmarks(user) {
    if (user) {
      try {
        const { data } = await getBookmarks();
        return data.movies;
      } catch (ex) {
        toast('Something went wrong... Could not retrieve bookmarks.');
        logger.log(ex);
        return [];
      }
    } else {
      return [];
    }
  }

  populateShoppingCart() {
    try {
      const cart = JSON.parse(localStorage.getItem('vidio-cart'));

      if (typeof cart !== 'object') {
        return [];
      }

      return [ ...cart ];
    } catch (ex) {
      return [];
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.shoppingCart !== this.state.shoppingCart) {
      localStorage.removeItem('vidio-cart');
      localStorage.setItem('vidio-cart', JSON.stringify(this.state.shoppingCart));
    }
  }

  handleAddToCart = (item) => {
    if (this.state.shoppingCart.find(m => m._id === item._id)) {
      return;
    }

    const movie = _.cloneDeep(item);
    movie.amount = 1;

    this.setState(state => {
      return {
        shoppingCart: [
          ...state.shoppingCart,
          movie
        ]
      };
    });
  };

  handleLike = async (movie) => {
    if (!this.state.user) {
      return;
    }

    const originalBookmarks = this.state.bookmarks;
    const bookmarks = _.cloneDeep(this.state.bookmarks);
    const bookmark = bookmarks.find(bookmark => bookmark._id === movie._id);

    // bookmark already exists - delete it
    if (bookmark) {
      // set bookmark state to loading before deleting
      bookmark.loading = true;
      this.setState(state => {
        return { bookmarks };
      });

      try {
        await deleteBookmark(movie._id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          toast.error('Bookmark has already been deleted');
        }

        this.setState(state => {
          return { bookmarks: originalBookmarks };
        });
      }

      // delete loading state bookmark after successful API query.
      const bookmarksCopied = _.cloneDeep(this.state.bookmarks);
      const index = bookmarksCopied.findIndex(bookmark => bookmark._id === movie._id);
      bookmarksCopied.splice(index, 1);
      this.setState(state => {
        return { bookmarks: bookmarksCopied };
      });

    // bookmark does not exist - create it
    } else {
      // create bookmark with state set to loading
      bookmarks.push({ _id: movie._id, title: movie.title, loading: true });
      this.setState(state => {
        return { bookmarks };
      });

      try {
        await createBookmark(movie._id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          toast.error('Bookmark has already been created');
        }

        this.setState(state => {
          return { bookmarks: originalBookmarks };
        });
      }

      // set loading state to false after successful API query
      const bookmarksCopied = _.cloneDeep(this.state.bookmarks);
      const bookmarkCopy = bookmarksCopied.find(bookmark => bookmark._id === movie._id);
      bookmarkCopy.loading = false;
      this.setState(state => {
        return { bookmarks: bookmarksCopied };
      });
    }
  }

  handleDelete = (item) => {
    this.setState(state => {
      return {
        shoppingCart: state.shoppingCart.filter(i => i._id !== item._id)
      };
    });
  };

  handleClear = () => {
    this.setState(state => {
      return { shoppingCart: [] };
    });
  }

  handleReset = () => {
    this.setState(state => {
      const shoppingCart = state.shoppingCart.map(item => {
        item.amount = 1;
        return item;
      });

      return { shoppingCart };
    });
  };

  handleIncrement = (item) => {
    this.setState(state => {
      const shoppingCart = [...state.shoppingCart];
      const index = shoppingCart.indexOf(item);
      shoppingCart[index] = { ...item };
      shoppingCart[index].amount++;

      return { shoppingCart };
    });
  };

  handleDecrement = (item) => {
    this.setState(state => {
      const shoppingCart = [...state.shoppingCart];
      const index = shoppingCart.indexOf(item);
      shoppingCart[index] = { ...item };
      shoppingCart[index].amount--;

      return { shoppingCart };
    });
  };

  render() {
    const { user, bookmarks, shoppingCart } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Layout
          user={user}
          bookmarks={bookmarks}
          shoppingCart={shoppingCart}
        >
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/forum/new"
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
                    onLike={this.handleLike}
                    onAddToCart={this.handleAddToCart}
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
                    onReset={this.handleReset}
                    onClear={this.handleClear}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                    onDelete={this.handleDelete}
                  />
                );
              }}
            />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
