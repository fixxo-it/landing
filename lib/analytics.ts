import mixpanel from 'mixpanel-browser';

/* Mixpanel for the marketing site. Same EU project as the app, so a visit here
   and a booking in the app can be read together. Everything is a no-op until
   NEXT_PUBLIC_MIXPANEL_TOKEN is set, so local dev and forks send nothing.

   Deliberately off: autocapture (it would read form fields on /join, which hold
   a caregiver applicant's name, phone and address) and session replay. Never
   put names, phone numbers, addresses or chat text in event properties. */

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const API_HOST = 'https://api-eu.mixpanel.com';

let ready = false;

export function initAnalytics() {
  if (ready || !TOKEN || typeof window === 'undefined') return;
  try {
    mixpanel.init(TOKEN, {
      api_host: API_HOST,
      autocapture: false,
      record_sessions_percent: 0,
      /* the App Router changes the URL without a reload, so this also fires
         on client-side navigation */
      track_pageview: 'url-with-path',
      persistence: 'localStorage',
    });
    /* `platform` is the same property the app sets (ios / android), so
       existing app reports split cleanly from web with a single filter */
    mixpanel.register({
      platform: 'web',
      source: 'landing',
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development',
    });
    ready = true;
  } catch {
    /* analytics must never break the page */
  }
}

export type LandingEvent =
  | 'download_cta_clicked'
  | 'caregiver_application_submitted'
  | 'chat_question_asked';

export function track(event: LandingEvent, props?: Record<string, unknown>) {
  if (!ready) return;
  try {
    mixpanel.track(event, props);
  } catch {
    /* see above */
  }
}
