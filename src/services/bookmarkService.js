import http from './httpService';

const resourceUrl = 'users/me/bookmarks';

function getBookmarkUrl(id) {
  return `${resourceUrl}/${id}`;
}

export const getBookmarks = () => {
  return http.get(resourceUrl);
};

export const createBookmark = movieId => {
  return http.post(resourceUrl, { movieId });
};

export const deleteBookmark = movieId => {
  return http.delete(getBookmarkUrl(movieId));
};
