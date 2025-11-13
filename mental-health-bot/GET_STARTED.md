# 🚀 Get Started - Mental Health iMessage Bot

**Welcome!** This is your complete mental health AI chatbot for iMessage. Here's everything you need to know to get started.

## 📁 Project Structure

```
mental-health-bot/
├── src/                          # Source code
│   ├── index.ts                  # 🎯 Main bot entry point
│   ├── config.ts                 # ⚙️ Configuration settings
│   ├── aiService.ts              # 🤖 Qwen AI integration (FREE!)
│   ├── messageHandler.ts         # 💬 Message processing
│   ├── conversationManager.ts    # 📝 Conversation history
│   ├── crisisDetection.ts        # 🆘 Safety system
│   └── prompts.ts                # 🎭 AI personality
│
├── .env.example                  # 📋 Environment template
├── package.json                  # 📦 Dependencies
├── tsconfig.json                 # 🔧 TypeScript config
│
└── Documentation/
    ├── README.md                 # 📚 Full documentation
    ├── QUICK_START.md            # ⚡ 5-minute setup
    ├── SETUP_CHECKLIST.md        # ✅ Step-by-step guide
    ├── CUSTOMIZATION_GUIDE.md    # 🎨 Advanced features
    ├── PROJECT_SUMMARY.md        # 📊 Project overview
    └── GET_STARTED.md            # 👋 This file!
```

## 🎯 What You're Building

A compassionate AI chatbot that:
- ✅ Responds to iMessages automatically
- ✅ Provides mental health support and coping techniques
- ✅ Detects crisis situations and provides resources
- ✅ Maintains conversation context
- ✅ Works 24/7 on your Mac

## ⏱️ Time Estimate

- **Quick Setup**: 10 minutes (no API key signup needed!)
- **Testing**: 5 minutes
- **Customization** (optional): 30-60 minutes
- **Total**: ~15 minutes to have a working bot

## 🎬 Quick Start (Choose Your Path)

### 🏃 Path 1: I Want It Running NOW (10 minutes)

Follow this super quick guide:

1. **Install Bun** (2 min)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   # Restart terminal
   ```

2. **Setup Project** (3 min)
   ```bash
   cd mental-health-bot
   bun install
   cp .env.example .env
   ```

3. **API Key Already Configured!** ✨
   - The `.env` file already includes a FREE API key
   - No signup needed, no credit card required
   - Uses Qwen 3.5 32B via Hack Club AI
   - Just works! 🎉

4. **Grant Permission** (3 min)
   - System Settings → Privacy & Security → Full Disk Access
   - Add Terminal (or your IDE)
   - Restart terminal

5. **Start Bot** (1 min)
   ```bash
   bun run dev
   ```

6. **Test It** (1 min)
   - Send yourself an iMessage: "hello"
   - Wait 3 seconds
   - Get response!

**Done! Bot is running!** 🎉

### 🎓 Path 2: I Want to Understand Everything (30 minutes)

Follow this detailed path:

1. **Read** [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) - Complete step-by-step guide
2. **Follow** each checkbox
3. **Test** all features
4. **Verify** everything works

### 🎨 Path 3: I Want to Customize It (60 minutes)

Perfect if you want to make it your own:

1. **Setup** using Path 1 (15 min)
2. **Test** basic functionality (10 min)
3. **Read** [`CUSTOMIZATION_GUIDE.md`](./CUSTOMIZATION_GUIDE.md) (15 min)
4. **Modify** prompts and features (20 min)

## 📚 Documentation Guide

**Which doc should I read?**

| Document | When to Read | Time | Purpose |
|----------|-------------|------|---------|
| **GET_STARTED.md** | 👉 Start here! | 5 min | Overview & navigation |
| **QUICK_START.md** | Want to run ASAP | 5 min | Fastest setup path |
| **SETUP_CHECKLIST.md** | Step-by-step setup | 15 min | Detailed installation |
| **README.md** | Understanding features | 20 min | Complete documentation |
| **CUSTOMIZATION_GUIDE.md** | Adding features | 30 min | Advanced customization |
| **PROJECT_SUMMARY.md** | Big picture view | 15 min | Architecture & design |

## 🎯 Learning Path

### Beginner Path 🌱
1. Read this file (GET_STARTED.md)
2. Follow QUICK_START.md
3. Test the bot
4. Read README.md introduction
5. Try customizing prompts

**Time**: ~1 hour
**Result**: Working bot you understand

### Intermediate Path 🌿
1. Complete Beginner Path
2. Read CUSTOMIZATION_GUIDE.md
3. Add custom commands
4. Implement mood tracking
5. Customize crisis detection

**Time**: ~3 hours
**Result**: Personalized bot with custom features

### Advanced Path 🌳
1. Complete Intermediate Path
2. Read PROJECT_SUMMARY.md
3. Add database persistence
4. Implement analytics
5. Build web dashboard
6. Add multi-language support

**Time**: ~10+ hours
**Result**: Production-ready mental health platform

## 🔍 Key Concepts

### 1. How It Works

```
User sends iMessage
       ↓
Bot watches for new messages (every 3 seconds)
       ↓
Checks for crisis keywords → Provides resources if needed
       ↓
Sends message to OpenAI with conversation history
       ↓
AI generates empathetic response
       ↓
Bot sends response back via iMessage
       ↓
Conversation history saved (up to 20 messages)
```

### 2. Core Components

**🤖 AI Service** (`aiService.ts`)
- Talks to OpenAI GPT-4
- Generates empathetic responses
- Handles errors gracefully

**💬 Message Handler** (`messageHandler.ts`)
- Routes incoming messages
- Handles commands (help, start, etc.)
- Processes text input

**📝 Conversation Manager** (`conversationManager.ts`)
- Stores conversation history
- Maintains context (20 messages)
- Auto-cleans old sessions (1 hour)

**🆘 Crisis Detection** (`crisisDetection.ts`)
- Scans for crisis keywords
- Determines severity (low/medium/high)
- Provides immediate resources

**🎭 Prompts** (`prompts.ts`)
- Defines AI personality
- System instructions
- Crisis keywords database

### 3. Safety Features

The bot is designed with safety first:

✅ **Clear Boundaries**: Always identifies as AI, not a therapist
✅ **Crisis Detection**: Automatic identification of concerning messages
✅ **Immediate Resources**: Provides crisis hotlines instantly
✅ **Non-diagnostic**: Never diagnoses mental health conditions
✅ **Encourages Professional Help**: Guides to therapists when needed

## 💡 Common Questions

### "Do I need coding experience?"
**No!** You can run it as-is. Customization requires basic TypeScript knowledge.

### "How much does it cost?"
**Completely FREE!** 🎉
- **AI Model**: Free (Qwen 3.5 32B via Hack Club AI)
- **iMessage Kit**: Free (SSPL license)
- **Total**: $0.00 - No credit card, no signup, no charges!

### "Is it secure?"
**Yes!** 
- Conversations stored in memory only (not saved to disk)
- Messages processed by Hack Club AI proxy (Qwen 3.5 32B)
- No third-party tracking
- Sessions expire after 1 hour
- Privacy-focused AI model

### "Can others use my bot?"
**Yes!** Anyone who texts you will get responses. You can:
- Keep it private (only you text yourself)
- Share with friends/family
- Use for your organization (check legal requirements)

### "What if it gives bad advice?"
The bot is designed to:
- Provide general support, not medical advice
- Defer to professionals for serious issues
- Provide crisis resources when needed
- Always state it's AI, not a therapist

### "Can I use a different AI model?"
**Yes!** The bot uses Qwen 3.5 32B (free), but you can switch to:

**Other Hack Club AI models** (also free):
- `moonshotai/kimi-k2-thinking` (reasoning-focused)
- `openai/gpt-oss-120b` (very large model)
- `moonshotai/kimi-k2-0905` (faster)

**Or paid providers**:
- OpenAI GPT-4 (paid)
- Anthropic Claude (paid)
- Local models via Ollama (free, private)

See CUSTOMIZATION_GUIDE.md for examples.

## 🎮 Testing Playground

Once your bot is running, try these:

### Basic Conversation
```
You: Hey, how are you?
Bot: [Friendly greeting and ask how you're doing]

You: I'm feeling a bit stressed about work
Bot: [Empathetic response about work stress]

You: Can you help me relax?
Bot: [Offers breathing exercise or coping technique]
```

### Commands
```
You: help
Bot: [Shows all capabilities]

You: resources
Bot: [Lists mental health resources]

You: crisis
Bot: [Provides crisis hotlines]
```

### Crisis Detection
```
You: I'm thinking about suicide
Bot: [Immediate crisis resources with urgency]
```

## 🚨 Important Reminders

### Before You Deploy

1. **Legal Disclaimer**: This is NOT professional therapy
2. **Privacy**: Understand data flow (Hack Club AI proxy)
3. **Monitoring**: Review conversations periodically
4. **Free Service**: No cost, but respect usage limits
5. **Crisis Plan**: Know when to escalate to humans

### Ethical Use

✅ **DO**:
- Clearly state bot is AI
- Provide crisis resources
- Encourage professional help
- Respect privacy
- Monitor for safety

❌ **DON'T**:
- Claim to diagnose conditions
- Prescribe treatments
- Replace professional therapy
- Make medical recommendations
- Guarantee outcomes

## 🎯 Success Metrics

You'll know your bot is working when:

✅ Responds within 5 seconds
✅ Conversations feel natural
✅ Crisis keywords trigger resources
✅ Commands execute properly
✅ No crashes or errors
✅ Sessions maintain context
✅ Users feel supported

## 📞 Getting Help

Stuck? Here's your escalation path:

1. **Quick Issues**: Check SETUP_CHECKLIST.md troubleshooting
2. **Understanding**: Read relevant section in README.md
3. **Customization**: See CUSTOMIZATION_GUIDE.md
4. **Technical**: Check iMessage Kit docs
5. **AI Issues**: Check OpenAI status page

## 🎉 What's Next?

Once your bot is running:

### Week 1: Learn & Observe
- [ ] Test all features
- [ ] Have real conversations
- [ ] Note what works well
- [ ] Identify improvements

### Week 2: Customize
- [ ] Adjust AI personality
- [ ] Add custom commands
- [ ] Modify crisis keywords
- [ ] Personalize resources

### Week 3: Enhance
- [ ] Add mood tracking
- [ ] Implement coping library
- [ ] Create daily check-ins
- [ ] Build analytics

### Week 4: Scale
- [ ] Add database persistence
- [ ] Implement logging
- [ ] Create backup system
- [ ] Consider multi-user

## 🌟 Inspiration

This bot can become:

🏥 **Personal Mental Health Companion**
- Daily check-ins
- Mood tracking
- Coping technique library
- Guided meditations

🏢 **Workplace Wellness Tool**
- Employee support
- Stress management
- Resource directory
- Anonymous access

🎓 **Educational Platform**
- Mental health education
- Coping skills training
- Resource navigation
- Peer support

👥 **Community Support**
- Group support facilitation
- Resource hub
- Crisis intervention
- Peer connections

## 💙 Final Thoughts

You're building something meaningful. Mental health support matters, and technology can help bridge the gap between crisis and care.

**Remember**:
- This is a support tool, not a replacement for therapy
- Safety always comes first
- Privacy and ethics matter
- Small support can make big impact

**Ready to start?** Pick your path:
- ⚡ **Quick**: Follow QUICK_START.md (15 min)
- ✅ **Thorough**: Use SETUP_CHECKLIST.md (30 min)
- 🎨 **Custom**: Start with quick, then read CUSTOMIZATION_GUIDE.md

---

**Questions? Issues? Stuck?**
1. Check the troubleshooting sections
2. Review the documentation
3. Test each component separately

**Crisis Resources** (if you need support):
- 🆘 Call/Text 988 (Suicide & Crisis Lifeline)
- 💬 Text HOME to 741741 (Crisis Text Line)
- 🌍 Visit findahelpline.com for international resources

---

Made with 💙 for mental health support.

**Let's get started!** → Go to [QUICK_START.md](./QUICK_START.md)
