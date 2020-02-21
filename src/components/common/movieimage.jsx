import React from 'react';
import { Link } from 'react-router-dom';

const MovieImage = ({ movie, height, width }) => {
  return (
    <Link to={`/movies/${movie._id}`}>
      <img
        height={height}
        width={width}
        src={movie.imgUrl}
        alt={movie.title + ' pic'}
      />
    </Link>
  );
};

export default MovieImage;
