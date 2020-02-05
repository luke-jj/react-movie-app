import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar';
import Counters from './components/counters';
import Movies from './components/movies';
import MovieForm from './components/movieform';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import Posts from './components/posts';
import Customers from './components/customers';
import Rentals from './components/rentals';
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
        <Navbar totalCounters={this.state.counters.filter(c => c.value > 0).length}/>
        <main className="container">
          { /* <h1>Hello, World!</h1> */ }
          { /* <p>Opening Paragraph</p> */}
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/forum/posts" component={Posts} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
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
