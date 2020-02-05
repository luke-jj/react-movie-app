import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: "https://2a17511d5aae4951a681049ef8c33110@sentry.io/2247093"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
