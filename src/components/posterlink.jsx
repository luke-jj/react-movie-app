import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { overlay } from '../utils';
import Poster from './poster';

const StyledLink = styled(Link)`
  display: block;
  ${overlay}
`;

const PosterLink = ({ movie, shadow }) => (
  <StyledLink to={`/movies/${movie._id}`}>
    <Poster movie={movie} shadow={shadow} />
  </StyledLink>
);

PosterLink.propTypes = {
  movie: PropTypes.object.isRequired,
  shadow: PropTypes.bool
};

export default PosterLink;
