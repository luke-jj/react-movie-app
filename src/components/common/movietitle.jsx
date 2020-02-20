import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './like';
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
          <Link to={`/movies/${movie._id}`}>
            <img height="94" width="64" src={movie.imgUrl} alt={movie.title + ' pic'}/>
          </Link>
          <div className={bookmark}>
            <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieTitle;
