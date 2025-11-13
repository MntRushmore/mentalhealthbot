import 'dotenv/config'

export const config = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4-turbo-preview',
    maxTokens: 500,
    temperature: 0.7,
  },

  // Bot Configuration
  bot: {
    name: process.env.BOT_NAME || 'MindfulBot',
    phoneNumber: process.env.BOT_PHONE_NUMBER || '',
  },

  // iMessage SDK Configuration
  imessage: {
    debug: true,
    maxConcurrent: 3,
    watcher: {
      pollInterval: 3000,
      unreadOnly: false,
      excludeOwnMessages: true,
      initialLookbackMs: 10000,
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
  if (!config.openai.apiKey) {
    throw new Error('OPENAI_API_KEY is required. Please set it in your .env file.')
  }
}
