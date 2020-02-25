const config = {
  API_URL: process.env.REACT_APP_API_URL,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
};

if (!config.API_URL) {
  throw new Error('FATAL ERROR: REACT_APP_API_URL must be defined.');
}

if (!config.SENTRY_DSN) {
  throw new Error('FATAL ERROR: REACT_APP_SENTRY_DSN must be defined.');
}

export default config;
