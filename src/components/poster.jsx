import React from 'react';

const Poster = ({ movie, height, width }) => {
  return (
    <img
      height={height}
      width={width}
      src={movie.imgUrl}
      alt={movie.title}
    />
  );
};

export default Poster;
