import http from './httpService';

const resourceUrl = 'reviews';

function getReviewUrl(id) {
  return `${resourceUrl}/${id}`;
}

export const getReviews = () => {
  return http.get(resourceUrl);
};

export const getReview = id => {
  return http.get(getReviewUrl(id));
};

export const saveReview = review => {
  if (!review._id) {
    return http.post(resourceUrl, review);
  }

  const body = { ...review };
  delete body._id;
  return http.put(getReviewUrl(review._id), body);
};

export const deleteReview = id => {
  return http.delete(getReviewUrl(id));
};
