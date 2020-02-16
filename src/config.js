const config = {
  API_URL: process.env.REACT_APP_API_URL,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  FORUM: process.env.REACT_APP_FORUM || "https://jsonplaceholder.typicode.com/posts"
};

if (!config.API_URL) {
  throw new Error('FATAL ERROR: REACT_APP_API_URL must be defined.');
}

if (!config.SENTRY_DSN) {
  throw new Error('FATAL ERROR: REACT_APP_SENTRY_DSN must be defined.');
}

export default config;
