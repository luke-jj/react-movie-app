import React from 'react';
import ListGroup from './common/listgroup';
import genrelistStyles from './genrelistStyles.module.scss';

const GenreList = ({genres, selectedGenre, onGenreSelect}) => {
  return (
    <div className={genrelistStyles.container}>
      <ListGroup
        items={genres}
        selectedItem={selectedGenre}
        onItemSelect={onGenreSelect}
      />
    </div>
  );
};

export default GenreList;
