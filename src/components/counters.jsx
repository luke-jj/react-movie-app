import React, { Component } from 'react';

import Counter from './counter';

class Counters extends Component {

  render() {
    const { counters, onReset, onDelete, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <h2>Shopping Cart</h2>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={onReset}
        >
          Reset
        </button>
        {
          counters.map(counter => {
            return (
              <Counter
                key={counter.id}
                // id={counter.id}
                // value={counter.value}
                // selected={true}
                onDelete={onDelete}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
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
