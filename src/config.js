const config = {
  API_URL: process.env.REACT_APP_API_URL,
  FORUM: process.env.REACT_APP_FORUM || "https://jsonplaceholder.typicode.com/posts"
};

if (!config.API_URL) {
  throw new Error('FATAL ERROR: REACT_APP_API_URL must be defined.');
}

export default config;
