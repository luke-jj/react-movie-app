import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getReviews } from '../services/reviewService';
import Spinner from './common/spinner';

class Reviews extends Component {

  state = {
    reviews: [],
    loading: true
  }

  async componentDidMount() {
    const { data: reviews } = await getReviews();

    this.setState(state => {
      return {
        reviews: [...reviews],
        loading: false
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <div>
        <h2 className="mb-4">Latest Movie Reviews</h2>
        {
          this.state.reviews.map(review => {
            return (
              <div className="card mb-3" key={review._id}>
                <div className="card-header">
                  Movie: {' '}
                  <Link to={`/movies/${review.movie._id}`}>
                    {review.movie.title}
                  </Link> {' '}
                  Genre: {review.movie.genre.name}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{review.title} <small>by {review.user.name}</small></h5>
                  <p className="card-text">{review.text}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Reviews;
