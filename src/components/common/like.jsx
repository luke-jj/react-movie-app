import React from 'react';
import { typography } from './likeStyles.module.scss';

const Like = ({ liked, onClick }) => {
  const classes = liked ? "fa fa-bookmark text-warning" : "fa fa-bookmark-o text-warning";

  return (
    <div className={typography}>
      <i
        className={classes}
        aria-hidden="true"
        onClick={onClick}
      />
    </div>
  );
}

export default Like;
