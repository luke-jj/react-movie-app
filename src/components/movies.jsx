import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listgroup';
import Spinner from './common/spinner';
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
    Promise.all([getGenres(), getMovies()])
      .then(result => {
        this.setState({
          genres: [ {_id: '', name: 'All'}, ...result[0].data ],
          movies: result[1].data,
        });
      });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    this.setState(state => {
      return { movies: state.movies.filter(m => m._id !== movie._id) };
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Movies has already been deleted');
      }

      this.setState(state => {
        return { movies: originalMovies };
      });
    }
  };

  handleLike = (movie) => {
    this.setState(state => {
      const movies = [...state.movies];
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

    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    if (!count) {
      return <Spinner />;
    }

    return (
      <div className="row">
        <div className="col-3 d-none d-md-block">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {movies.length} of {totalCount} movies.</p>
          <SearchBox text={searchText} onSearch={this.handleSearch} />
          <MoviesTable
            user={this.props.user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <div className="d-flex justify-content-between">
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
              {
                (user && user.isAdmin) && (
                  <Link to="/movies/new">
                    <button className="btn btn-primary mb-4">
                      New Movie
                    </button>
                  </Link>
                )
              }
              {
                (!user || !user.isAdmin) && (
                  <button className="btn btn-primary mb-4 disabled">
                    Add Movie
                  </button>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
