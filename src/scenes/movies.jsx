import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import MoviesTable from '../components/moviestable';
import Pagination from '../components/common/pagination';
import GenreList from '../components/genrelist';
import Spinner from '../components/common/spinner';
import SearchBox from '../components/common/searchbox';

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      searchText: '',
      sortColumn: { path: 'title', order: 'asc' }
    };
  }

  async componentDidMount() {
    const result = await Promise.all([getGenres(), getMovies()]);
    const genres = result[0].data;
    const movies = result[1].data;
    const { bookmarks } = this.props;

    if (bookmarks) {
      this.injectBookmarksIntoMovies(movies, bookmarks);
    }

    this.setState({
      genres: [
        { _id: '', name: 'All'},
        ...genres
      ],
      movies
    });
  }

  componentDidUpdate(prevProps) {
    const { bookmarks } = this.props;

    if (bookmarks !== prevProps.bookmarks) {
      const movies = _.cloneDeep(this.state.movies);
      this.injectBookmarksIntoMovies(movies, bookmarks);
      this.setState(state => {
        return { movies };
      });
    }
  }

  injectBookmarksIntoMovies(movies, bookmarks) {
    movies.forEach(movie => {
      const bookmark = bookmarks.find(m => m._id === movie._id);

      if (bookmark) {
        movie.liked = true;
        movie.loading = bookmark.loading;
      } else {
        movie.liked = false;
        movie.loading = false;
      }
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

  handlePageChange = (page) => {
    this.setState(state => {
      return { currentPage: page };
    });
  };

  handleGenreSelect = (genre) => {
    this.setState(state => {
      return {
        selectedGenre: genre === state.selectedGenre ? state.genres[0] : genre,
        searchText: '',
        currentPage: 1
      };
    });
  };

  handleSort = (sortColumn) => {
    this.setState(state => {
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
    const { user, onLike, onAddToCart } = this.props;
    const { totalCount, data: movies } = this.getPagedData();
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchText
    } = this.state;

    if (!count) {
      return <Spinner />;
    }

    return (
      <div className="row">
        <div className="col-2 d-none d-md-block">
          <GenreList
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {movies.length} of {totalCount} movies.</p>
          <SearchBox text={searchText} onSearch={this.handleSearch} />
          <MoviesTable
            user={this.props.user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={onLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onAddToCart={onAddToCart}
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
