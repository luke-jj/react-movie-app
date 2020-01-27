import React, { Component } from 'react';

import Counter from './counter';

class Counters extends Component {
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

      return {
        counters
      };
    });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
        {
          this.state.counters.map(counter => {
            return (
              <Counter
                key={counter.id}
                // id={counter.id}
                // value={counter.value}
                // selected={true}
                onDelete={this.handleDelete}
                counter={counter}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Counters;
