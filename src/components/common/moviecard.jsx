import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Like from './like';
import Star from './star';
import PosterLink from './posterlink';

const Card = styled.div`
  width: 160px;
  height: 290px;
  background-color: rgb(25, 25, 25);
`;

const CardBody = styled.div`
  display: flex;
  height: 100%;
  padding: 2px 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 14px;

  a {
    color: white;

    &:hover {
      text-decoration: none;
    }
  }
`;

const BookmarkContainer = styled.div`
  position: absolute;
  font-size: 44px;
  top: -17px;
  left: -3px;
  text-shadow: -1px 0 rgba(255,255,255,.7), 0 1px rgba(255,255,255,.7), 1px 0 rgba(255,255,255,.7), 0 -1px rgba(255,255,255,.7);
  cursor: pointer;
`;

const StarContainer = styled.div`
  position: absolute;
  font-size: 22px;
  top: 216px;
  left: 8px;
  text-shadow: -1px 0 rgba(255,255,255,.7), 0 1px rgba(255,255,255,.7), 1px 0 rgba(255,255,255,.7), 0 -1px rgba(255,255,255,.7);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  span {
    color: black;
    font-weight: bold;
  }
`;

const MovieCard = ({ movie, loading, onLike }) => (
  <Card className="card">
    <div className="position-relative">
      <PosterLink movie={movie} height={236} width={160}/>
      <BookmarkContainer>
        { loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Like liked={movie.liked} onClick={() => onLike(movie)} />
        )}
      </BookmarkContainer>
      <StarContainer>
        <Star /> {' '}
        <span>{movie.rating ?? '-'}</span>
      </StarContainer>
    </div>
    <CardBody>
      <Link to={`/movies/${movie._id}`} tabIndex="-1">
        {movie.title}
      </Link>
    </CardBody>
  </Card>
);

export default MovieCard;
