import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Like from './common/like';
import Pagination from './pagination';

class Movies extends Component {

  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (!count) {
      return ( <div><p>There are no movies in the database</p></div> );
    }

    const movies = paginate(this.state.movies, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {movies.length} of { count } movies.</p>
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
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
