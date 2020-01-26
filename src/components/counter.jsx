import React, { Component } from 'react';

class Counter extends Component {

  state = {
    count: 1,
    imgUrl: 'https://picsum.photos/200'
  };

  styles = {
    fontSize: 12,
    fontWeight: 'bold'
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <img src={this.state.imgUrl} alt="" />
        </div>
        <span style={{ fontSize: 15, fontWeight: 'bold' }} className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">
          Increment
        </button>
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
}

export default Counter;
