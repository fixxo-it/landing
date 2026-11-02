import { initBotId } from 'botid/client/core';

/* Vercel BotID: an invisible check (no CAPTCHA) attached to the requests
   listed here. The server side is checkBotId() in the same route. The chat's
   ask route is the only public endpoint that spends money per request
   (Gemini), so it is the one protected. */
initBotId({
  protect: [{ path: '/api/chat/ask', method: 'POST' }],
});
