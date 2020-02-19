import http from './httpService';

const resourceUrl = 'threads';

function getThreadUrl(id) {
  return `${resourceUrl}/${id}`;
}

export const getThreads = () => {
  return http.get(resourceUrl);
};

export const getThread = id => {
  return http.get(getThreadUrl(id));
};

export const saveThread = thread => {
  if (!thread._id) {
    return http.post(resourceUrl, thread);
  }

  const body = { ...thread };
  delete body._id;
  return http.put(getThreadUrl(thread._id), body);
};

export const deleteThread= id => {
  return http.delete(getThreadUrl(id));
};

export const getPosts = id => {
  return http.get(getThreadUrl(id) + '/posts');
};

export const createPost = (threadId, post) => {
  return http.post(getThreadUrl(threadId) + '/posts', post);
};

export default {
  getThreads,
  getThread,
  saveThread,
  deleteThread,
  getPosts,
  createPost
};
