import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getBookmarks,
  createBookmark,
  deleteBookmark
} from './services/bookmarkService';

import Layout from './components/layout';
import Routes from './routes';
import logger from './services/logService';
import auth from './services/authService';

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
      <Router>
        <ToastContainer />
        <Layout
          user={user}
          bookmarks={bookmarks}
          shoppingCart={shoppingCart}
        >
          <Routes
            user={user}
            bookmarks={bookmarks}
            shoppingCart={shoppingCart}
            onLike={this.handleLike}
            onAddToCart={this.handleAddToCart}
            onReset={this.handleReset}
            onClear={this.handleClear}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </Layout>
      </Router>
    );
  }
}

export default App;
