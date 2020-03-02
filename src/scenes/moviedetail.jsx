import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import Poster from '../components/poster';
import { getMovie } from '../services/movieService';

function MovieDetail({ match, history, user }) {
  const [movie, setMovie] = useState({});
  const { id } = match.params;
  const { replace } = history;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const { data: movie } = await getMovie(id);
        setMovie(movie);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          replace('/not-found');
        }
      }
    }

    loadMovie();
  }, [id, replace]);

  return (
    <MovieWrapper
      backdrop={movie.backdropPath ? `https://image.tmdb.org/t/p/w1280${movie.backdropPath}` : ''}
    >
      <MovieInfo>
        <Overdrive id={`${movie._id}`}>
          <Poster movie={movie} shadow />
        </Overdrive>
        <div>
          <h1>{movie.title}</h1>
          <h3>{movie.releaseDate}</h3>
          <p>{movie.description}</p>
          <p>{movie.rating}</p>
        </div>
      </MovieInfo>
    </MovieWrapper>
  );
}

MovieDetail.propTypes = {
  user: PropTypes.object
};

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  height: 100%;
  background: rgb(228,226,221);
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
