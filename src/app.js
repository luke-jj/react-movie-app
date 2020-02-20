import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from './services/authService';
import Navbar from './components/navbar';
import Counters from './components/counters';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import Logout from './components/logout';
import Movies from './components/movies';
import MovieForm from './components/movieform';
import Reviews from './components/reviews';
import Forum from './components/forum';
import Thread from './components/thread';
import ThreadForm from './components/threadform';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Profile from './components/profile';
import NotFound from './components/notfound';

class App extends Component {

  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 0 },
      { id: 3, value: 4 },
      { id: 4, value: 0 },
    ]
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState(state => {
      return { user };
    });
  }

  handleDelete = (id) => {
    this.setState(prevState => {
      return {
        counters: prevState.counters.filter(counter => counter.id !== id)
      };
    });
  };

  handleReset = (id) => {
    this.setState(prevState => {
      const counters = prevState.counters.map(c => {
        c.value = 0;
        return c;
      });

      return { counters };
    });
  };

  handleIncrement = (counter) => {
    this.setState(prevState => {
      const counters = [...prevState.counters];
      const index = counters.indexOf(counter);
      counters[index] = { ...counter };
      counters[index].value++;

      return { counters };
    });
  };

  handleDecrement = (counter) => {
    this.setState(prevState => {
      const counters = [...prevState.counters];
      const index = counters.indexOf(counter);
      counters[index] = { ...counter };
      counters[index].value--;

      return { counters }
    });
  };

  renderCart = () => (
    <Counters
      counters={this.state.counters}
      onReset={this.handleReset}
      onIncrement={this.handleIncrement}
      onDecrement={this.handleDecrement}
      onDelete={this.handleDelete}
    />
  );

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar
          user={this.state.user}
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/forum/new"
              render={props => {
                if (!this.state.user) {
                  return (
                    <Redirect to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }} />
                  );
                }

                return (
                  <ThreadForm {...props} user={this.state.user} />
                );
              }}
            />
            <Route
              path="/forum/:id"
              render={props => <Thread {...props} user={this.state.user} />}
            />
            <Route
              path="/forum"
              render={props => <Forum {...props} user={this.state.user} />}
            />
            <Route
              path="/reviews"
              render={props => <Reviews {...props} user={this.state.user} />}
            />
            <Route
              path="/movies/:id"
              render={props => <MovieForm {...props} user={this.state.user} />}
            />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route
              path="/customers"
              render={props => {
                if (!this.state.user || !this.state.user.isAdmin) {
                  return (
                    <Redirect to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }} />
                  );
                }

                return <Customers {...props} user={this.state.user} />;
              }}
            />
            <Route
              path="/rentals"
              render={props => {
                if (!this.state.user || !this.state.user.isAdmin) {
                  return (
                    <Redirect to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }} />
                  );
                }

                return <Rentals {...props} />;
              }}
            />
            <Route
              path="/profile"
              render={props => {
                if (!this.state.user) {
                  return (
                    <Redirect to={{
                      pathname: "/login",
                      state: { from: props.location }
                    }} />
                  );
                }

                return <Profile {...props} user={this.state.user} />;
              }}
            />
            <Route path="/cart" render={() => this.renderCart()} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>

        </main>
      </React.Fragment>
    );
  }
}

export default App;
