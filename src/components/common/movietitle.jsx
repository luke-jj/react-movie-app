import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './like';
import MovieImage from './movieimage';
import { bookmark } from './movietitle.module.scss'

class MovieTitle extends Component {

  render() {
    const { movie } = this.props;

    return (
      <React.Fragment>
        <Link to={`/movies/${movie._id}`}>
          {movie.title} <br/>
        </Link>
        <div className="position-relative">
          <MovieImage movie={movie} height={94} width={64}/>
          <div className={bookmark}>
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
      </React.Fragment>
    );
  }
}

export default MovieTitle;
