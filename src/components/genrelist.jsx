import React from 'react';
import styled from 'styled-components';
import ListGroup from './common/listgroup';

const GenreListContainer = styled.div`
  max-width: 100px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ul {
    li:hover {
      cursor: pointer;
    }
  }
`;

const GenreList = ({genres, selectedGenre, onGenreSelect}) => (
  <GenreListContainer>
    <ListGroup
      items={genres}
      selectedItem={selectedGenre}
      onItemSelect={onGenreSelect}
    />
  </GenreListContainer>
);

export default GenreList;
