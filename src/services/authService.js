import http from './httpService';
import { apiUrl } from '../config.json';

export const login = (email, password) => {
  return http.post(apiUrl + 'auth', { email, password });
};
