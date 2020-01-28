import React, { Component } from 'react';

import Navbar from './components/navbar';
import Counters from './components/counters';
import Movies from './components/movies';

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

  render() {
    return (
      <React.Fragment>
        <Navbar totalCounters={this.state.counters.filter(c => c.value > 0).length}/>
        <main className="container">
          <h1>Hello, World!</h1>
          <p>Opening Paragraph</p>
          <Movies />
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
