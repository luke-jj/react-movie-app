import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listgroup';
import MoviesTable from './moviestable';
import SearchBox from './searchbox';


class Movies extends Component {

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchText: '',
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{_id: '', name: 'All'}, ...getGenres()]
    });
  }

  handleDelete = (movie) => {
    deleteMovie(movie._id);

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
        searchText: '',
        currentPage: 1
      };
    });
  };

  handleSort = (sortColumn) => {
    this.setState(prevState => {
      return { sortColumn };
    });
  };

  handleSearch = query => {
    this.setState({
      searchText: query,
      selectedGenre: null,
      currentPage: 1
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
      sortColumn,
      searchText
    } = this.state;

    // search
    const searched = allMovies.filter(movie => {
      const regex = new RegExp(searchText, 'gi');
      return regex.test(movie.title);
    });

    // 1. filter
    const filtered = selectedGenre && selectedGenre._id
      ? searched.filter(movie => movie.genre._id === selectedGenre._id)
      : searched;

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
      sortColumn,
      searchText
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
          <Link to="/movies/new">
            <button className="btn btn-primary mb-4">
              New Movies
            </button>
          </Link>
          <p>Showing {movies.length} of {totalCount} movies.</p>
          <SearchBox text={searchText} onSearch={this.handleSearch} />
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
