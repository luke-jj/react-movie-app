import React from 'react';
import { Link } from 'react-router-dom';
import styles from './movieimage.module.scss';

const MovieImage = ({ movie, height, width }) => {
  return (
    <Link to={`/movies/${movie._id}`}>
      <div className={styles.overlay}>
        <img
          className="card-img-top"
          height={height}
          width={width}
          src={movie.imgUrl}
          alt={movie.title + ' pic'}
        />
      </div>
    </Link>
  );
};

export default MovieImage;
