import React, { Component } from 'react';
import styled from 'styled-components';

class TableHeader extends Component {

  // raise the sort event
  raiseSort(path) {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc' ? 'desc' : 'asc');
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  }

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc') {
      return <i className="fa fa-sort-asc" />;
    } else {
      return <i className="fa fa-sort-desc" />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          { this.props.columns.map(column => (
            <Th
              minWidth={column.width}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </Th>
          ))}
        </tr>
      </thead>
    );
  }
}

const Th = styled.th`
  minWidth: ${({ minWidth }) => minWidth ? minWidth : '50px'};
  maxWidth: '900px';

  &:hover {
    cursor: pointer;
  }
`;

export default TableHeader;
