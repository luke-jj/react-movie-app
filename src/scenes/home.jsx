import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { above } from '../utils';
import { getMovies } from '../services/movieService';
import PosterLink from '../components/posterlink';

function Home() {
  const [movies, setMovies] = useState([]);
  const saveMovies = async () => {
    const { data: movies } = await getMovies();
    setMovies(movies);
  };

  useEffect(() => {
    const originalBackground = window.getComputedStyle(document.body);
    document.body.style = 'background: #222';
    saveMovies();

    return () => document.body.style = originalBackground;
  }, []);

  return (
    <Container >
      <h2 className="mb-4">Popular Today</h2>
      <MovieGrid>
        { movies.map(movie => (
          <Overdrive key={movie._id} id={movie._id}>
            <PosterContainer>
              <PosterLink movie={movie} shadow />
            </PosterContainer>
          </Overdrive>
        ))}
      </MovieGrid>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  height: 100%;
  max-width: 1200px;
  padding 40px 30px 10px;
  margin: 0 auto;
`;

const PosterContainer = styled.div`
  max-width: 154px;
`;

const MovieGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  ${above.sm`
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.25rem;
  `}

  ${above.md`
    grid-template-columns: repeat(4, 1fr);
  `}

  ${above.lg`
    grid-template-columns: repeat(5, 1fr);
  `}

  ${above.xl`
    grid-template-columns: repeat(6, 1fr);
  `}
`;

export default Home;
