import React, { Component } from 'react';

import Table from './common/table';

class CustomerTable extends Component {

  columns = [
    { path: 'name', label: 'Name', width: '150px'},
    { path: 'phone', label: 'Phone', width: '150px'},
    { path: 'isGold', label: 'Gold Customer', width: '150px', content: (item) => item.isGold ? 'yes' : 'no' },
    { key: 'delete', content: (item) => <button disabled={!this.props.user || !this.props.user.isAdmin} className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(item)} >Delete</button> },
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={sortColumn}
        columns={this.columns}
        data={customers}
        onSort={onSort}
      />
    );
  }
}

export default CustomerTable;
