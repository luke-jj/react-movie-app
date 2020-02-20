import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {

  state = {
    selectedMovie: {}
  };

  columns = [
    { path: 'title', label: 'Title', content: (movie) => this.renderTitle(movie)},
    { path: 'genre.name', label: 'Genre' },
    { path: 'year', label: 'Year' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
    { key: 'delete', content: (movie) => this.renderDeleteButton(movie)}
  ];

  renderTitle(movie) {
    return (
      <React.Fragment>
        <Link to={`/movies/${movie._id}`}>
          {movie.title} <br/>
          <img height="94" width="64" src={movie.imgUrl} alt={movie.title + ' pic'}/>
        </Link>
      </React.Fragment>
    );
  }

  renderDeleteButton(movie) {
    return (
      <button
        disabled={!this.props.user || !this.props.user.isAdmin}
        className="btn btn-danger btn-sm"
        data-toggle="modal"
        data-target="#deleteModal"
        type="button"
        onClick={() => this.setState({ selectedMovie: movie })}
      >
        Delete
      </button>
    );
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <>
        <Table
          sortColumn={sortColumn}
          columns={this.columns}
          data={movies}
          onSort={onSort}
        />
        <div
          className="modal fade"
          id="deleteModal"
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
                  id="deleteUserModal"
                >
                  Delete Movie
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
                Are you sure you want delete {this.state.selectedMovie.title}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  No, keep it.
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => this.props.onDelete(this.state.selectedMovie)}
                >
                  Yes, delete movie.
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MoviesTable;
