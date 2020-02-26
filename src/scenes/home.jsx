import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { getMovies } from '../services/movieService';
import PosterLink from '../components/posterlink';

class Home extends PureComponent {
  state = {
    movies: [],
  }

  async componentDidMount() {
    document.body.style = 'background: #222';
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  componentWillUnmount() {
    document.body.style = 'background: rgb(228,226,221)';
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => (
          <PosterWrapper key={movie._id}>
            <PosterLink movie={movie}/>
          </PosterWrapper>
        ))}
      </MovieGrid>
    );
  }
}

const PosterWrapper = styled.div`
  box-shadow: 0 0 35px black;
`;

const MovieGrid = styled.div`
  background: #222;
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;

export default Home;
