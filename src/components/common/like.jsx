import React from 'react';

const Like = ({ liked, onClick }) => {
  const classes = liked ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default Like;
