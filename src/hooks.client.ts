import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://8c8ef8a2e65ee4d730b3872431695579@o4508739873079296.ingest.us.sentry.io/4508739876159488',
  tracesSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export const handlError = Sentry.handleErrorWithSentry();