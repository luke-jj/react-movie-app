import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Poster from './poster';
import overlay from '../utils/overlay';

const StyledLink = styled(Link)`
  display: block;

  ${overlay}
`;

const PosterLink = ({ movie, shadow }) => (
  <StyledLink to={`/movies/${movie._id}`}>
    <Poster movie={movie} shadow={shadow} />
  </StyledLink>
);

export default PosterLink;
