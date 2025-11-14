import 'dotenv/config'

export const config = {
  // AI Configuration (Using Hack Club AI Proxy with Qwen 3.5 32B)
  ai: {
    apiKey: process.env.AI_API_KEY || 'ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22',
    baseURL: 'https://ai.hackclub.com/proxy/v1',
    model: 'qwen/qwen3-32b',
    maxTokens: 150, // Shorter, punchier responses (was 600)
    temperature: 0.8, // Slightly more creative/human (was 0.7)
  },

  // Bot Configuration
  bot: {
    name: process.env.BOT_NAME || 'Sage',
    phoneNumber: process.env.BOT_PHONE_NUMBER || '',
    personality: 'bouncer', // protective, calm, caring like poke.com
  },

  // iMessage SDK Configuration
  imessage: {
    debug: false, // Reduced spam
    maxConcurrent: 3,
    watcher: {
      pollInterval: 5000, // Increased from 3s to 5s to reduce checks
      unreadOnly: true,   // Only respond to unread (prevents spam!)
      excludeOwnMessages: true, // Don't respond to your own messages
      initialLookbackMs: 0, // Don't process old messages on startup
    },
  },

  // Crisis Resources
  crisis: {
    hotline: process.env.CRISIS_HOTLINE || '988',
    textLine: process.env.CRISIS_TEXT_LINE || '741741',
  },

  // Webhook (optional)
  webhook: process.env.WEBHOOK_URL
    ? {
        url: process.env.WEBHOOK_URL,
      }
    : undefined,
}

// Validate required configuration
export function validateConfig() {
  if (!config.ai.apiKey) {
    throw new Error('AI_API_KEY is required. Please set it in your .env file.')
  }
  console.log('✅ Using Qwen 3.5 32B model via Hack Club AI')
}
