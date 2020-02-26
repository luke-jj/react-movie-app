import React from 'react';

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

export default Table;
