import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from '../components/common/table';

class ShoppingCart extends Component {

  state = {
    sortColumn: { path: 'title', order: 'asc' }
  }

  columns = [
    { path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path: '_id', label: 'ID'},
    { key: 'count', content: (movie) => {
      return (
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.onIncrement(movie)}
          >
            +
          </button>
          {' '}
          <span
            style={{ fontSize: 15, fontWeight: 'bold' }}
            className={this.getBadgeClasses(movie)}
          >
            {this.formatCount(movie)}
          </span>
          <button
            className="btn btn-secondary btn-sm m-2"
            disabled={this.getDisabledIncrementStatus(movie)}
            onClick={() => this.props.onDecrement(movie)}
          >
            -
          </button>
        </div>
      );
    }},
    { key: 'delete', content: (movie) => {
      return (
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      );
    }}
  ];

  handleSort = (sortColumn) => {
    this.setState(state => {
      return { sortColumn };
    });
  };

  formatCount(movie) {
    return movie.amount === 0 ? 'Zero' : movie.amount;
  }

  getBadgeClasses(movie) {
    let classes = 'badge badge-';
    classes += movie.amount === 0 ? 'warning' : 'primary';

    return classes;
  }

  getDisabledStatus() {
    return !this.props.items.length;
  }

  getDisabledIncrementStatus(movie) {
    return movie.amount < 1;
  }

  render() {
    const { sortColumn } = this.state;
    const { items, onReset, onClear } = this.props;

    // sort items
    const sorted = _.orderBy(items, [sortColumn.path], [sortColumn.order]);

    return (
      <div>
        <h2>Shopping Basket</h2>
        <button
          disabled={this.getDisabledStatus()}
          className="btn btn-primary btn-sm m-2 float-right"
          onClick={onClear}
        >
          Clear Cart
        </button>
        <button
          disabled={this.getDisabledStatus()}
          className="btn btn-primary btn-sm m-2 float-right"
          onClick={onReset}
        >
          Reset Amounts
        </button>
        <Table
          sortColumn={this.state.sortColumn}
          columns={this.columns}
          data={sorted}
          onSort={this.handleSort}
        />
        <button
          hidden={this.getDisabledStatus()}
          className="btn btn-success btn m-2 mt-4 float-right"
          onClick={onReset}
        >
          Proceed To Checkout
        </button>
          { !this.props.items.length &&
            <p>There are no eggs in your basket.</p>
          }
      </div>
    );
  }
}

export default ShoppingCart;
