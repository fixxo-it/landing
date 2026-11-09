import { initBotId } from 'botid/client/core';
import { initAnalytics } from '@/lib/analytics';

initAnalytics();

/* Vercel BotID: an invisible check (no CAPTCHA) attached to the requests
   listed here. The server side is checkBotId() in the same route. The chat's
   ask route spends money per request (Gemini), and the waitlist writes parents'
   details to the database, so those are the ones protected. */
initBotId({
  protect: [
    { path: '/api/chat/ask', method: 'POST' },
    { path: '/api/waitlist', method: 'POST' },
  ],
});
