import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => (
    column.content ? column.content(item) : _.get(item, column.path)
  );

  createKey = (item, column) => item._id + (column.path || column.key);

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        { data.map(item => (
          <tr key={item._id}>
            { columns.map(col => (
              <td className="align-middle" key={this.createKey(item, col)}>
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default TableBody;
