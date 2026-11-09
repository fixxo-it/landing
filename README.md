Chinmay Misses Sai <3

## Analytics

Mixpanel (EU project, same as the app) via `lib/analytics.ts`. Set `NEXT_PUBLIC_MIXPANEL_TOKEN` in Vercel; unset means nothing is sent. Autocapture and session replay are off on purpose: `/join` holds applicants' personal details, so never put names, phones, addresses or chat text in event properties.

Every event carries `platform: web` (the app sends `ios` / `android`) and `source: landing`. Filter app reports with `platform != web`.

Events: `$mp_web_page_view` (automatic), `download_cta_clicked`, `caregiver_application_submitted`, `chat_question_asked`.
