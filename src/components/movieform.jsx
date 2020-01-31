import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

class MovieForm extends Form {

  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    if (id === 'new') {
      return this.setState({
        genres: getGenres()
      });
    }

    const movie = getMovie(id);

    if (!movie) {
      return this.props.history.replace('/not-found');
    }

    this.setState({
      genres: getGenres(),
      data: this.mapToViewModel(movie)
    });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit() {
    saveMovie(this.state.data);

    this.props.history.push('/movies');
  }

  render() {
    return (
      <div>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput('title', 'Title') }
          { this.renderSelect('genreId', 'Genre', this.state.genres) }
          { this.renderInput('numberInStock', 'Number in Stock') }
          { this.renderInput('dailyRentalRate', 'Rate') }
          { this.renderButton('Save') }
        </form>
      </div>
    );
  }
};

export default MovieForm;
