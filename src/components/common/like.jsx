import React from 'react';

const Like = ({ liked, onClick }) => {
  const classes = liked
    ? "fa fa-bookmark text-warning"
    : "fa fa-bookmark-o text-warning";

  return (
    <div>
      <i
        className={classes}
        aria-hidden="true"
        onClick={onClick}
      />
    </div>
  );
}

export default Like;
