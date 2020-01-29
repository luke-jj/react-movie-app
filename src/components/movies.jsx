import React, { Component } from 'react';
import _ from 'lodash';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listgroup';
import MoviesTable from './moviestable';


class Movies extends Component {

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{_id: '', name: 'All'}, ...getGenres()]
    });
  }

  handleDelete = (movie) => {
    this.setState(prevState => {
      return { movies: prevState.movies.filter(m => m._id !== movie._id) };
    });
  };

  handleLike = (movie) => {
    this.setState(prevState => {
      const movies = [...prevState.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;

      return { movies };
    });
  }

  handlePageChange = (page) => {
    this.setState(prevState => {
      return { currentPage: page };
    });
  };

  handleGenreSelect = (genre) => {
    this.setState(prevState => {
      return {
        selectedGenre: genre,
        currentPage: 1
      };
    });
  };

  handleSort = (sortColumn) => {
    this.setState(prevState => {
      return { sortColumn };
    });
  };

  /*
   * Filter, order and paginate data.
   */
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    // 1. filter
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    // 2. order
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);


    // 3. paginate
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (!count) {
      return ( <div><p>There are no movies in the database</p></div> );
    }


    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {movies.length} of {totalCount} movies.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
