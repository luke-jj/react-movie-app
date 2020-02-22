import React from 'react';
import ListGroup from './common/listgroup';
import styles from './genrelistStyles.module.scss';

const GenreList = ({genres, selectedGenre, onGenreSelect}) => {
  return (
    <div className={styles.container}>
      <ListGroup
        items={genres}
        selectedItem={selectedGenre}
        onItemSelect={onGenreSelect}
      />
    </div>
  );
};

export default GenreList;
