import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Like from './common/like';
import Pagination from './pagination';
import ListGroup from './listgroup';

class Movies extends Component {

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{name: 'All'}, ...getGenres()]
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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

    if (!count) {
      return ( <div><p>There are no movies in the database</p></div> );
    }

    const filteredMovies = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {movies.length} of { filteredMovies.length } movies.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {
                movies.map(movie => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          liked={movie.liked}
                          onClick={() => this.handleLike(movie)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
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
