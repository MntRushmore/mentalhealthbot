# Sage - Mental Health iMessage Bot

A protective, grounded AI mental health companion for iMessage. Inspired by poke.com - think bouncer energy: direct, caring, real.

## 🎯 What It Does

Sage watches your iMessages and responds with:
- **Real talk** - Direct, no-BS mental health support
- **Crisis detection** - Immediate help when needed
- **Short & punchy** - 1-3 sentence responses
- **Protective vibe** - Like a caring bouncer for your mental space

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd mental-health-bot
bun install
```

### 2. Configure (Already Done!)
```bash
cp .env.example .env
```
The API key is pre-configured (FREE Qwen 3.5 32B).

### 3. Grant Permission
**System Settings → Privacy & Security → Full Disk Access**
- Add your Terminal/IDE
- **Quit and reopen** terminal (important!)

### 4. Run
```bash
bun run dev
```

### 5. Test
Send an iMessage from another phone. Sage will respond!

## 💬 Example Interactions

```
You: hey there
Sage: Hey. What's going on?

You: feeling anxious
Sage: Anxiety lying to you again? Take 5 deep ones. Right now.

You: I need help
Sage: I got you. What do you need?
```

## 🎮 Commands

- `start` - Fresh conversation
- `help` - See what Sage can do
- `reset` - Clear history
- `crisis` - Emergency numbers
- `resources` - Mental health support

## 🛠️ Configuration

Edit `.env` to customize:
```env
AI_API_KEY=ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22
BOT_NAME=Sage
```

## 🔧 Tech

- **AI**: Qwen 3.5 32B (FREE via Hack Club AI)
- **Platform**: macOS only (iMessage requirement)
- **Runtime**: Bun
- **Framework**: @photon-ai/imessage-kit

## 🆘 Crisis Response

Sage automatically detects crisis situations and provides:
- 988 Suicide & Crisis Lifeline
- Crisis Text Line (741741)
- Emergency resources

## 📝 Features

✅ No spam (message deduplication)  
✅ Only responds to unread messages  
✅ Short, punchy responses (150 tokens)  
✅ Protective bouncer personality  
✅ Real-time crisis detection  
✅ Session management (1-hour timeout)  
✅ 100% free to run  

## ⚠️ Important

- **Not a therapist** - Sage is support, not professional therapy
- **macOS only** - Requires access to iMessage database
- **Full Disk Access required** - Must grant permission
- **Responds to everyone** - Anyone who messages you gets responses

## 🔒 Privacy

- Messages stored in memory only (no disk)
- Sessions expire after 1 hour
- Data sent only to Hack Club AI proxy
- No third-party tracking

## 📊 How It Works

```
New iMessage arrives
    ↓
Sage detects it (every 5 seconds)
    ↓
Checks if already processed (no spam!)
    ↓
AI generates protective, caring response
    ↓
Sends reply via iMessage
```

## 🐛 Troubleshooting

**Bot not responding?**
- Check Full Disk Access is granted
- Restart terminal after granting permission
- Verify: `ls ~/Library/Messages/chat.db` works

**Still having issues?**
- Make sure `unreadOnly: true` in config
- Check bot is running: `bun run dev`
- Wait 5 seconds after sending message

## 🚀 Made With

- Qwen 3.5 32B (Hack Club AI)
- TypeScript
- Bun Runtime
- iMessage Kit

---

**Real support. Real talk. Real protection.** 🛡️

Repository: https://github.com/MntRushmore/mentalhealthbot
