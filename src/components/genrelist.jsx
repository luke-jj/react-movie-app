import React from 'react';
import ListGroup from './common/listgroup';
import styled from 'styled-components';

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

const GenreList = ({genres, selectedGenre, onGenreSelect}) => {
  return (
    <GenreListContainer>
      <ListGroup
        items={genres}
        selectedItem={selectedGenre}
        onItemSelect={onGenreSelect}
      />
    </GenreListContainer>
  );
};

export default GenreList;
