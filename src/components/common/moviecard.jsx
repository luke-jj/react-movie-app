import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './like';
import MovieImage from './movieimage';
import styles from './moviecard.module.scss'

class MovieTitle extends Component {

  render() {
    const { movie } = this.props;

    return (
      <React.Fragment>
        <div className={styles.card + " card"}>
          <div className="position-relative">
            <MovieImage movie={movie} height={236} width={160}/>
            <div className={styles.bookmark}>
              { this.props.loading &&
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
              { !this.props.loading &&
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
              }
            </div>
          </div>
          <div className={styles.cardBody}>
            <Link to={`/movies/${movie._id}`}>
              {movie.title} <br/>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieTitle;
