import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import Table from '../components/common/table';

class ShoppingCart extends Component {

  state = {
    sortColumn: { path: 'title', order: 'asc' }
  }

  columns = [
    { path: 'title', label: 'Item', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path: 'dailyRentalRate', label: 'Price'},
    { key: 'count', label: 'Amount', content: (movie) => (
      <div>
        <button
          className="btn btn-secondary btn-sm mr-2"
          onClick={() => this.props.onIncrement(movie)}
        >
          +
        </button>
        <span className={this.getBadgeClasses(movie)}>
          <Counter>
            {this.formatCount(movie)}
          </Counter>
        </span>
        <button
          className="btn btn-secondary btn-sm ml-2"
          disabled={this.getDisabledIncrementStatus(movie)}
          onClick={() => this.props.onDecrement(movie)}
        >
          -
        </button>
      </div>
    )},
    { key: 'delete', content: (movie) => (
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => this.props.onDelete(movie)}
      >
        Remove
      </button>
    )},
  ];

  handleSort = (sortColumn) => this.setState(state => ({ sortColumn }));

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

  getTotalPrice() {
    return this.props.items.reduce((acc, cur) => (
      acc + ( cur.amount * cur.dailyRentalRate )
    ),0);
  }

  getTotalItems() {
    return this.props.items.reduce((acc, cur) => acc + cur.amount, 0);
  }

  getCheckoutSummary() {
    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();

    return `${totalItems} ${totalItems === 1 ? 'item' : 'items'} for a total of ${this.getTotalPrice()} Galactic ${totalPrice === 1 ? 'Credit' : 'Credits'}.`;
  }

  render() {
    const { sortColumn } = this.state;
    const { items, onReset, onClear } = this.props;

    const sorted = _.orderBy(items, [sortColumn.path], [sortColumn.order]);

    return (
      <CartWrapper>
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
        <div className="clearfix" hidden={this.getDisabledStatus()}>
          <span className="float-right">
            {this.getCheckoutSummary()}
          </span>
        </div>
        <div>
          <button
            hidden={this.getDisabledStatus()}
            className="btn btn-success btn m-2 mt-4 float-right"
            data-toggle="modal"
            data-target="#checkoutNotice"
            type="button"
          >
            Proceed To Checkout
          </button>
        </div>
        <div hidden={!this.getDisabledStatus()}>
          <p>There are no eggs in your basket.</p>
        </div>

        <div
          className="modal fade"
          id="checkoutNotice"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteUserModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="checkoutNotice"
                >
                  Checkout
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Not available at the moment.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close.
                </button>
              </div>
            </div>
          </div>
        </div>
      </CartWrapper>
    );
  }
}

const CartWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Counter = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

export default ShoppingCart;
