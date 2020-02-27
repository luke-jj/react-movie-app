import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Table from './common/table';

class RentalTable extends Component {

  columns = [
    { path: 'movie.title', label: 'Title', width: '150px' },
    { path: 'customer.name', label: 'Name' , width: '150px'},
    {
      path: 'dateOut',
      label: 'Date Out',
      width: '150px',
      content: (item) => moment(item.dateOut).format("YYYY-MM-DD, h:mm")
    },
    {
      path: 'dateReturned',
      label: 'Date Returned',
      width: '150px',
      content: (item) => (
        item.dateReturned
          ? moment(item.dateReturned).format("YYYY-MM-DD, h:mm")
          : ''
      )
    },
    { path: 'rentalFee', label: 'Rental Fee', width: '100px'},
    {
      key: 'return',
      content: (item) => (
        <button
          disabled={item.dateReturned}
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onReturn(item)}
        >
          Return
        </button>
      )
    },
  ];

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={sortColumn}
        columns={this.columns}
        data={rentals}
        onSort={onSort}
      />
    );
  }
}

RentalTable.propTypes = {
  rentals: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onReturn: PropTypes.func.isRequired,
};

export default RentalTable;
