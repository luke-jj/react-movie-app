import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {

  columns = [
    { path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: (item) => <Like liked={item.liked} onClick={() => this.props.onLike(item)} /> },
    { key: 'delete', content: (item) => <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(item)} >Delete</button> },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={sortColumn}
        columns={this.columns}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
