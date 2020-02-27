import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './tableheader';
import TableBody from './tablebody';

const Table = ({ sortColumn, columns, data, onSort }) => (
  <div className="table-responsive">
    <table className="table">
      <TableHeader
        sortColumn={sortColumn}
        columns={columns}
        onSort={onSort}
      />
      <TableBody
        data={data}
        columns={columns}
      />
    </table>
  </div>
);

Table.propTypes = {
  sortColumn: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;
