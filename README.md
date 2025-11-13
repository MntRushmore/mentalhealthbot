# Mental Health iMessage AI Chatbot

A compassionate AI-powered mental health support chatbot for iMessage, built with the iMessage Kit and **Qwen 3.5 32B** (via Hack Club AI).

## Features

### 🤖 AI-Powered Support
- Empathetic, conversational mental health support
- Uses **Qwen 3.5 32B** for intelligent, context-aware responses (FREE!)
- Maintains conversation history for coherent interactions
- Evidence-based coping strategies (CBT, DBT, mindfulness)

### 🆘 Crisis Detection
- Automatic detection of crisis situations
- Immediate crisis resource provision
- Multiple severity levels (low, medium, high)
- Comprehensive crisis hotline information

### 💬 Conversation Management
- Session-based conversation tracking
- Automatic session cleanup after 1 hour of inactivity
- Maximum 20 messages per conversation for context
- New conversation detection and greeting

### 🛡️ Safety Features
- Clear boundaries (bot vs. professional therapy)
- Encourages professional help when needed
- Privacy-focused (DM only by default)
- Error handling and fallback responses

### 📱 iMessage Integration
- Real-time message watching
- Automatic responses to direct messages
- Support for both iMessage and SMS
- Optional webhook integration for logging

## Prerequisites

- **macOS** (iMessage Kit only works on macOS)
- **Bun** runtime (recommended) or Node.js >= 18.0.0
- **Free AI API key** (already included! 🎉)
- **Full Disk Access** permission for your terminal/IDE

**No paid API required!** The bot uses Qwen 3.5 32B via Hack Club AI's free proxy.

## Installation

### 1. Clone or copy the project

```bash
cd mental-health-bot
```

### 2. Install dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Configure environment variables

```bash
# Copy the example env file (includes free API key!)
cp .env.example .env
```

The `.env` file already includes a free API key:
```env
AI_API_KEY=ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22
BOT_NAME=MindfulBot
```

**No setup needed!** The API key is pre-configured. Just customize the bot name if you want.

### 4. Grant Full Disk Access

The bot needs access to your iMessage database:

1. Open **System Settings → Privacy & Security → Full Disk Access**
2. Click the **"+"** button
3. Add your terminal application (Terminal, iTerm, Warp, etc.) or IDE (VS Code, Cursor, Zed, etc.)

## Usage

### Starting the bot

```bash
# Using Bun (recommended)
bun run dev

# Or using npm
npm run dev
```

The bot will start watching for new iMessage conversations and respond automatically.

### Bot Commands

Users can send these commands to the bot:

- **`help`** - Show help message with capabilities
- **`start`** - Begin a new conversation with greeting
- **`reset`** - Clear conversation history
- **`resources`** - Get mental health resource links
- **`crisis`** - Get crisis hotline information

Commands can be sent as plain text, with `/` prefix, or `!` prefix:
- `help`
- `/help`
- `!help`

### Example Conversation

```
User: Hey, I'm feeling really anxious today

Bot: I hear that you're feeling anxious. That's really tough, and I'm glad 
you reached out. Anxiety can feel so overwhelming. Would you like to try a 
quick grounding technique that might help?

User: Yes please

Bot: Great! Let's try the 5-4-3-2-1 grounding technique:

Look around and name:
• 5 things you can SEE
• 4 things you can TOUCH
• 3 things you can HEAR
• 2 things you can SMELL
• 1 thing you can TASTE

Take your time with each one. This helps bring you back to the present 
moment. How are you feeling now?
```

### Crisis Detection Example

```
User: I don't want to be here anymore

Bot: 🆘 CRISIS RESOURCES

If you're in immediate danger:
• Call 911

24/7 Crisis Support:
• Call/Text 988 (Suicide & Crisis Lifeline)
• Text HOME to 741741 (Crisis Text Line)
• Call 1-800-273-8255 (National Suicide Prevention Lifeline)

[... additional resources ...]

I'm really concerned about your safety right now. What you're feeling is 
serious, and you deserve immediate support from trained crisis professionals.

Please reach out to one of these resources right away. You don't have to go 
through this alone. 💙
```

## Configuration

### config.ts

Customize the bot's behavior in `src/config.ts`:

```typescript
export const config = {
  openai: {
    model: 'gpt-4-turbo-preview',  // AI model to use
    maxTokens: 500,                 // Max response length
    temperature: 0.7,               // Response creativity (0-1)
  },
  
  imessage: {
    debug: true,                    // Enable debug logging
    maxConcurrent: 3,               // Max concurrent message sends
    watcher: {
      pollInterval: 3000,           // Check for new messages every 3s
      excludeOwnMessages: true,     // Don't respond to own messages
    },
  },
  
  crisis: {
    hotline: '988',                 // Crisis hotline number
    textLine: '741741',             // Crisis text line
  },
}
```

### Conversation Settings

In `src/conversationManager.ts`:

```typescript
private readonly maxHistoryLength = 20      // Messages to keep in context
private readonly sessionTimeout = 3600000   // Session expiry (1 hour)
```

### System Prompt

Customize the AI's personality and approach in `src/prompts.ts`:

```typescript
export const systemPrompt = `You are a compassionate, empathetic mental 
health support AI assistant...`
```

## Project Structure

```
mental-health-bot/
├── src/
│   ├── index.ts                 # Main bot entry point
│   ├── config.ts                # Configuration
│   ├── aiService.ts             # AI integration (Qwen 3.5 32B)
│   ├── messageHandler.ts        # Message processing logic
│   ├── conversationManager.ts   # Conversation history management
│   ├── crisisDetection.ts       # Crisis detection system
│   └── prompts.ts               # AI system prompts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Safety & Ethics

### Important Disclaimers

⚠️ **This bot is NOT a replacement for professional mental health care**

- The bot clearly states it's an AI assistant, not a therapist
- It encourages users to seek professional help when appropriate
- Crisis situations trigger immediate provision of crisis resources
- All crisis detections are logged for review

### Privacy Considerations

- Conversations are stored in memory only (not persisted to disk)
- Sessions expire after 1 hour of inactivity
- No data is sent to external servers except Hack Club AI proxy
- The AI model (Qwen 3.5 32B) is privacy-conscious and secure
- Consider implementing encryption for production use

### Ethical Guidelines

1. **Transparency**: Always identify as an AI
2. **Safety First**: Prioritize user safety over conversation flow
3. **Boundaries**: Don't diagnose or prescribe treatment
4. **Encouragement**: Guide users toward professional resources
5. **Non-judgmental**: Create a safe, supportive space

## Customization

### Using Different AI Models

The bot currently uses **Qwen 3.5 32B** via Hack Club AI (free, fast, intelligent).

Want to try other models from Hack Club AI? Available options:
- `qwen/qwen3-32b` (current - balanced)
- `moonshotai/kimi-k2-thinking` (reasoning-focused)
- `openai/gpt-oss-120b` (very large)
- `moonshotai/kimi-k2-0905` (fast)

Change in `src/config.ts`:
```typescript
model: 'qwen/qwen3-32b', // Change to any model above
```

To use other AI providers (OpenAI, Anthropic Claude, etc.):
1. Update the client initialization in `src/aiService.ts`
2. Change the API endpoint in `src/config.ts`
3. Get an API key for that provider

### Adding More Features

Ideas for enhancement:

- **Mood tracking**: Log user mood over time
- **Scheduled check-ins**: Proactive wellness messages
- **Resource library**: Curated mental health resources
- **Meditation guides**: Audio/text meditation instructions
- **Journal prompts**: Daily journaling suggestions
- **Group support**: Moderated group chat support

### Localization

To support other languages/regions:

1. Update crisis resources in `src/crisisDetection.ts`
2. Translate system prompt in `src/prompts.ts`
3. Add language-specific keywords for crisis detection
4. Adjust OpenAI model for better language support

## Monitoring & Logging

### Console Output

The bot logs:
- Incoming messages (with sender info)
- Crisis detections (with severity)
- AI responses
- Errors and warnings
- Statistics every 5 minutes

### Webhook Integration

Configure a webhook in `.env` to receive events:

```env
WEBHOOK_URL=https://your-server.com/webhook
```

Events sent to webhook:
- New messages
- Crisis detections
- Errors

### Production Monitoring

For production use, consider adding:
- Structured logging (Winston, Pino)
- Error tracking (Sentry)
- Analytics (custom or third-party)
- Database persistence
- Human escalation system

## Troubleshooting

### Bot not responding

1. **Check Full Disk Access**: Ensure your terminal/IDE has permission
2. **Verify API key**: Check `.env` file has valid OpenAI API key
3. **Check logs**: Look for error messages in console output
4. **Test manually**: Try sending a test message

### OpenAI API errors

```
Error: Rate limit exceeded
```
- Wait a few minutes and try again
- Upgrade your OpenAI plan for higher limits

```
Error: Invalid API key
```
- Check your API key in `.env` file
- Ensure no extra spaces or quotes

### Permission errors

```
Error: EACCES: permission denied
```
- Grant Full Disk Access as described in installation
- Restart your terminal/IDE after granting permission

## Development

### Running tests

```bash
bun test  # or npm test
```

### Linting

```bash
bun run lint
```

### Type checking

```bash
bun run type-check
```

### Building for production

```bash
bun run build
```

## License

This project uses the iMessage Kit which is licensed under SSPL-1.0.

## Acknowledgments

- Built with [@photon-ai/imessage-kit](https://github.com/photon-hq/imessage-kit)
- Powered by [OpenAI GPT-4](https://openai.com)
- Crisis resources from [988 Lifeline](https://988lifeline.org)

## Support

For issues or questions:
1. Check the [iMessage Kit documentation](https://github.com/photon-hq/imessage-kit)
2. Review the troubleshooting section above
3. Open an issue on GitHub

---

**Remember**: This is a support tool, not professional medical advice. Always encourage users to seek professional help when needed. 💙
