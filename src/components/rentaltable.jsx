import React, { Component } from 'react';
import moment from 'moment';

import Table from './common/table';

class RentalTable extends Component {

  columns = [
    { path: 'movie.title', label: 'Title' },
    { path: 'customer.name', label: 'Name' },
    { path: 'dateOut', label: 'Date Out', content: (item) => moment(item.dateOut).format("YYYY-MM-DD, h:mm") },
    { path: 'dateReturned', label: 'Date Returned', content: (item) => item.dateReturned ? moment(item.dateReturned).format("YYYY-MM-DD, h:mm") : '' },
    { path: 'rentalFee', label: 'Rental Fee' },
    { key: 'return', content: (item) => <button disabled={item.dateReturned} className="btn btn-danger btn-sm" onClick={() => this.props.onReturn(item)} >Return</button> },
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

export default RentalTable;
