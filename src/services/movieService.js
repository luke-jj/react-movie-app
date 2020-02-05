import http from './httpService';
import { apiUrl } from '../config.json';

const resourceUrl = apiUrl + 'movies';

function getMovieUrl(id) {
  return `${resourceUrl}/${id}`;
}

export const getMovies = () => {
  return http.get(resourceUrl);
};

export const getMovie = id => {
  return http.get(getMovieUrl(id));
};

export const saveMovie = movie => {
  if (!movie._id) {
    return http.post(resourceUrl, movie);
  }

  const body = { ...movie };
  delete body._id;
  return http.put(getMovieUrl(movie._id), body);
};

export const deleteMovie = id => {
  return http.delete(getMovieUrl(id));
};
