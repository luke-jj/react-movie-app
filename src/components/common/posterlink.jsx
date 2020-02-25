import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Poster from './poster';
import overlay from '../../utils/overlay';

const StyledLink = styled(Link)`
  display: block;

  img {
    width:100%;
    vertical-align:top;
  }

  ${overlay}
`;

const PosterLink = ({ movie, height, width }) => {
  return (
    <StyledLink to={`/movies/${movie._id}`}>
      <Poster
        height={height}
        width={width}
        movie={movie}
      />
    </StyledLink>
  );
};

export default PosterLink;
