import React from 'react';
import Joi from 'joi-browser';
import styled from 'styled-components';

import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {

  state = {
    data: { title: '\u00a0', genreId: '', numberInStock: '', dailyRentalRate: '' },
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

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState(state => { return { genres }; });
  }

  async populateMovie() {
    try {
      const id = this.props.match.params.id;
      if (id === 'new') return;

      const { data: movie } = await getMovie(id);
      this.setState(state => { return { data: this.mapToViewModel(movie) } });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
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

  getButtonName() {
    const id = this.props.match.params.id;
    if (id === 'new') return 'Save';

    return 'Update';
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  }

  render() {
    return (
      <div>
        <h2>{this.state.data.title}</h2>
        <StyledForm onSubmit={this.handleSubmit}>
          <fieldset disabled={!this.props.user || !this.props.user.isAdmin}>
            { this.renderInput('title', 'Title') }
            { this.renderSelect('genreId', 'Genre', this.state.genres) }
            { this.renderInput('numberInStock', 'Number in Stock') }
            { this.renderInput('dailyRentalRate', 'Rate') }
            { this.renderButton(this.getButtonName()) }
          </fieldset>
        </StyledForm>
      </div>
    );
  }
};

const StyledForm = styled.form`
  max-width: 380px;
`;

export default MovieForm;
