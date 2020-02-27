import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getReviews } from '../services/reviewService';
import Spinner from '../components/common/spinner';
import styled from 'styled-components';

class Reviews extends Component {

  state = {
    reviews: [],
    loading: true
  }

  async componentDidMount() {
    const { data: reviews } = await getReviews();
    this.setState(state => ({ reviews: [...reviews], loading: false }));
  }

  render() {
    if (this.state.loading) return <Spinner />;

    return (
      <ReviewWrapper className="container pt-5">
        <h2 className="mb-4">Latest Movie Reviews</h2>
        { this.state.reviews.map(review => (
          <div className="card mb-3" key={review._id}>
            <div className="card-header">
              Movie: {' '}
              <Link to={`/movies/${review.movie._id}`}>
                {review.movie.title}
              </Link> {' '}
              Genre: {review.movie.genre.name}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {review.title} <small>by {review.user.name}</small>
              </h5>
              <p className="card-text">{review.text}</p>
            </div>
          </div>
        ))}
      </ReviewWrapper>
    );
  }
}

Reviews.propTypes = {
  user: PropTypes.object
};

const ReviewWrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export default Reviews;
