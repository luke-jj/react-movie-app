import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {

  columns = [
    { path: 'title', label: 'Title', content: (movie) => {
      return (
        <React.Fragment>
          <Link to={`/movies/${movie._id}`}>
            {movie.title} <br/>
            <img height="94" width="64" src={movie.imgUrl} alt={movie.title + ' pic'}/>
        </Link>
        </React.Fragment>
      );
      }
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'year', label: 'Year' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: (item) => <Like liked={item.liked} onClick={() => this.props.onLike(item)} /> },
    { key: 'delete', content: (item) => <button disabled={!this.props.user || !this.props.user.isAdmin} className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(item)} >Delete</button> },
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
