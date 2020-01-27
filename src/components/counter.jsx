import React, { Component } from 'react';

class Counter extends Component {

  state = {
    count: this.props.counter.value
  };

  styles = {
    marginBottom: '10px'
  };

  render() {
    return (
      <React.Fragment>
        <div style={this.styles}>
          <span style={{ fontSize: 15, fontWeight: 'bold' }} className={this.getBadgeClasses()}>{this.formatCount()}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.handleIncrement()}
          >
            Increment
          </button>

          { /* delete button */ }
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }

  getBadgeClasses() {
    let classes = 'badge badge-';
    classes += this.state.count === 0 ? 'warning' : 'primary';

    return classes;
  }

  // handling events
  handleIncrement() {
    console.log('increment clicked', this.state);

    // updating state based on previous state
    this.setState(prevState => {
      return { count: prevState.count + 1};
    });
  }
}

export default Counter;
