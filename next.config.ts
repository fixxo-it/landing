import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
};

/* Vercel BotID: adds the rewrites its invisible challenge needs. The chat's
   ask route (app/api/chat/ask) rejects requests BotID classifies as bots. */
export default withBotId(nextConfig);
