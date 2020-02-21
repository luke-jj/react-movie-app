import http from './httpService';

export const getRentals = () => {
  return http.get('rentals');
};

export const getRental = id => {
  return http.get(`rentals/${id}`);
};

export const createRental = rental => {
  return http.post('rentals', rental);
};

export const returnRental = rental => {
  return http.post('returns', {
    customerId: rental.customer._id,
    movieId: rental.movie._id
  });
};
