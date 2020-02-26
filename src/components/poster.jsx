import React from 'react';
import styled, { css } from 'styled-components';

const Poster = ({ movie, shadow }) => (
  <Img
    src={movie.posterPath ? `http://image.tmdb.org/t/p/w154${movie.posterPath}` : ''}
    alt={movie.title}
    shadow={shadow}
  />
);

export default Poster;

const Img = styled.img`
  ${({ shadow }) => shadow && css`
    box-shadow: 0 0 35px black;
  `}
`;
