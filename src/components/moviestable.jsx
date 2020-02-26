import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Table from './common/table';
import MovieCard from './moviecard'

class MoviesTable extends Component {

  state = {
    selectedMovie: {},
    toShoppingCart: false
  };

  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <MovieCard
          movie={movie}
          loading={movie.loading}
          onLike={this.props.onLike}
        />
      )
    },
    { path: 'genre.name', label: 'Genre', width: '90px' },
    { path: 'year', label: 'Year', width: '70px' },
    { path: 'numberInStock', label: 'Stock', width: '70px' },
    { path: 'dailyRentalRate', label: 'Rate', width: '70px' },
    { key: 'modify', width: '130px', content: (movie) => {
      return (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
          { this.renderCartButton(movie) }
          </div>
          { /*
          <div className="mb-1">
          { this.renderEditButton(movie) }
          </div>
          <div className="mb-1">
          { this.renderDeleteButton(movie) }
          </div>
          */ }
          <div>
          { this.renderReviewButton(movie) }
          </div>
        </div>
      );
    }},
  ];

  renderCartButton(movie) {
    return (
      <button
        className="btn btn-success btn-sm"
        type="button"
        onClick={() => {
          this.props.onAddToCart(movie);
          this.setState(state => { return { toShoppingCart: true };});
        }}
      >
        <span style={{fontSize: '18px'}}>
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </span>
      </button>
    );
  };

  renderEditButton(movie) {
    return (
      <button
        disabled={!this.props.user || !this.props.user.isAdmin}
        className="btn btn-info btn-sm"
        type="button"
      >
        Edit
      </button>
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
        onClick={() => this.setState(state => ({ selectedMovie: movie }))}
      >
        Delete
      </button>
    );
  }

  renderReviewButton(movie) {
    return (
      <button
        className="btn btn-warning btn-sm"
        type="button"
      >
        Add Review
      </button>
    );
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    if (this.state.toShoppingCart) {
      return <Redirect to="/cart" />;
    }

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
