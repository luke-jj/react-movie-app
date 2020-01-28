import React, { Component } from 'react';

class Counter extends Component {

  styles = {
    marginBottom: '10px'
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={this.styles}>
          <div className="col-1" style={{ width: '50px' }}>
            <span style={{ fontSize: 15, fontWeight: 'bold' }} className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>

          <div className="col">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => this.props.onIncrement(this.props.counter)}
            >
              +
            </button>

            <button
              className="btn btn-secondary btn-sm m-2"
              disabled={this.getDisabledStatus()}
              onClick={() => this.props.onDecrement(this.props.counter)}
            >
              -
            </button>

            { /* delete button */ }
            <button
              className="btn btn-danger btn-sm m-2"
              onClick={() => this.props.onDelete(this.props.counter.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }

  getBadgeClasses() {
    let classes = 'badge badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';

    return classes;
  }

  getDisabledStatus() {
    return this.props.counter.value < 1;
  }

  // // handling events
  // handleIncrement() {
    // console.log('increment clicked', this.state);

    // // updating state based on previous state
    // this.setState(prevState => {
      // return { count: prevState.count + 1};
    // });
  // }
}

export default Counter;
