# Quick Start Guide

Get your mental health iMessage bot running in 5 minutes!

## Prerequisites Checklist

- [ ] macOS computer
- [ ] Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- [ ] OpenAI API account (https://platform.openai.com)
- [ ] Terminal with Full Disk Access

## Step-by-Step Setup

### 1. Install Bun (if not already installed)

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal after installation.

### 2. Install Dependencies

```bash
cd mental-health-bot
bun install
```

### 3. Configure Environment (Optional)

The bot comes with a **free API key already configured**! Just copy the example:

```bash
# Copy example env file (includes free API key)
cp .env.example .env
```

The `.env` file already includes:
```env
AI_API_KEY=ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22
BOT_NAME=MindfulBot
```

**No API key needed!** The bot uses Qwen 3.5 32B via Hack Club AI (free). ✨

### 4. Customize (Optional)

You can edit `.env` to change the bot name:
```bash
nano .env
```

Save and exit (Ctrl+X, then Y, then Enter).

### 5. Grant Full Disk Access

**IMPORTANT**: Without this, the bot cannot read iMessages!

1. Open **System Settings**
2. Go to **Privacy & Security**
3. Click **Full Disk Access**
4. Click the **+** button
5. Navigate to `/Applications/Utilities/`
6. Select **Terminal** (or your terminal app)
7. Enable the checkbox
8. **Restart your terminal**

For VS Code, Cursor, or other IDEs:
- Add the IDE application instead of Terminal
- Example: `/Applications/Visual Studio Code.app`

### 6. Start the Bot

```bash
bun run dev
```

You should see:
```
🤖 Starting Mental Health iMessage Bot...
📱 Bot Name: MindfulBot
⏳ Initializing...

✅ Bot is running and watching for messages!
💬 Send a message to start a conversation
```

### 7. Test It!

1. Open **Messages** app on your Mac
2. Send yourself a message: "Hello"
3. The bot should respond within a few seconds!

## Common Issues

### "Cannot read iMessage database"
**Solution**: Grant Full Disk Access and restart terminal

### "AI API error"
**Solution**: Check your API key in `.env` file (should already be configured)

### "Module not found"
**Solution**: Run `bun install` again

### No response from bot
**Solution**: 
- Check console for errors
- Ensure bot is running
- Wait 3-5 seconds for polling

## Test Conversation

Try these messages to test features:

```
You: help
Bot: [Shows help message]

You: I'm feeling anxious
Bot: [Provides empathetic support]

You: resources
Bot: [Shows mental health resources]
```

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Customize the bot personality in `src/prompts.ts`
- Adjust configuration in `src/config.ts`
- Add custom features in `src/messageHandler.ts`

## Need Help?

1. Check the [Troubleshooting](./README.md#troubleshooting) section
2. Review [iMessage Kit docs](https://github.com/photon-hq/imessage-kit)
3. Check OpenAI API status (https://status.openai.com)

## Safety Reminder

⚠️ This bot is for support only, not professional therapy. Always:
- Clearly communicate bot limitations to users
- Provide crisis resources when needed
- Encourage professional help for serious concerns
- Monitor conversations for safety

---

**You're ready!** 🚀 Your mental health support bot is now running!
