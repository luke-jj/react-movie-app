import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
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
      <Container className="container">
        <h3 className="mb-4">Popular Today</h3>
        <MovieGrid>
          {this.state.movies.map(movie => (
            <Overdrive key={movie._id} id={movie._id}>
              <PosterLink movie={movie} width="100%" height="231px" shadow />
            </Overdrive>
          ))}
        </MovieGrid>
      </Container>
    );
  }
}

const Container = styled.div`
  color: white;
  height: 100%;
  padding: 1rem;
  background: #222;
  padding-top: 40px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 1.25rem;
`;

export default Home;
