import * as Sentry from '@sentry/browser';
import config from '../config';

function init() {
  Sentry.init({ dsn: config.SENTRY_DSN });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
