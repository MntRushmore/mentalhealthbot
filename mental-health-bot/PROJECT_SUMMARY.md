# Mental Health iMessage Bot - Project Summary

## 🎯 Overview

A fully-functional, production-ready mental health support chatbot that runs on macOS and responds to iMessages using AI (OpenAI GPT-4).

## 📦 What's Included

### Core Files

1. **`src/index.ts`** - Main bot entry point
   - Initializes iMessage SDK
   - Starts message watcher
   - Handles graceful shutdown
   - Statistics logging

2. **`src/config.ts`** - Configuration management
   - OpenAI settings
   - Bot settings
   - Crisis resources
   - Environment validation

3. **`src/aiService.ts`** - AI integration
   - OpenAI API wrapper
   - Response generation
   - Error handling
   - Greeting/help messages

4. **`src/messageHandler.ts`** - Message processing
   - Command parsing
   - Message routing
   - Resource management
   - Statistics tracking

5. **`src/conversationManager.ts`** - Conversation state
   - History tracking
   - Session management
   - Auto-cleanup
   - Context formatting

6. **`src/crisisDetection.ts`** - Safety system
   - Keyword detection
   - Severity assessment
   - Crisis response generation
   - Logging

7. **`src/prompts.ts`** - AI personality
   - System prompt
   - Crisis keywords
   - Topic detection
   - Response templates

### Configuration Files

- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`.env.example`** - Environment template
- **`.gitignore`** - Git exclusions

### Documentation

- **`README.md`** - Comprehensive documentation
- **`QUICK_START.md`** - 5-minute setup guide
- **`CUSTOMIZATION_GUIDE.md`** - Advanced customization
- **`PROJECT_SUMMARY.md`** - This file

## 🚀 Key Features

### 1. AI-Powered Responses
- GPT-4 integration for intelligent, empathetic responses
- Conversation history tracking (20 messages)
- Context-aware conversations
- Evidence-based mental health support (CBT, DBT, mindfulness)

### 2. Crisis Detection System
- Automatic keyword detection
- 3 severity levels (low, medium, high)
- Immediate crisis resource provision
- Comprehensive logging for review

### 3. Conversation Management
- Per-user conversation history
- 1-hour session timeout
- Automatic session cleanup
- New conversation detection

### 4. Safety Features
- Clear bot boundaries (not a therapist)
- Encourages professional help
- Privacy-focused (DM only by default)
- Crisis hotline information (988, Crisis Text Line)

### 5. Bot Commands
- `help` - Show capabilities
- `start` - Begin new conversation
- `reset` - Clear history
- `resources` - Mental health resources
- `crisis` - Crisis hotline info

### 6. iMessage Integration
- Real-time message watching
- Automatic responses
- Both iMessage and SMS support
- Optional webhook for logging

## 🏗️ Architecture

```
User sends iMessage
       ↓
iMessage SDK watches for new messages
       ↓
MessageHandler receives message
       ↓
Check for commands → Execute command
       ↓
Crisis detection → Provide crisis resources
       ↓
ConversationManager retrieves history
       ↓
AIService generates response (OpenAI)
       ↓
ConversationManager stores response
       ↓
iMessage SDK sends response
       ↓
User receives reply
```

## 📊 Statistics & Monitoring

The bot tracks:
- Active conversations
- Total messages processed
- Crisis detections (logged to console)
- Errors and warnings
- API usage

Statistics logged every 5 minutes to console.

## 🔒 Safety & Ethics

### Built-in Safety Features

1. **Transparency**: Always identifies as AI
2. **Boundaries**: Clearly not professional therapy
3. **Crisis Response**: Immediate resources for crises
4. **Professional Referral**: Encourages seeking help
5. **Non-diagnostic**: Never diagnoses conditions

### Privacy Considerations

- Conversations stored in memory only
- No disk persistence
- Sessions expire after 1 hour
- Only OpenAI API receives data
- No third-party analytics (unless webhook configured)

### Ethical Guidelines Implemented

- Non-judgmental tone
- Validation before suggestions
- Evidence-based techniques
- Culturally sensitive
- Age-appropriate (default: adults)

## 🛠️ Technology Stack

- **Runtime**: Bun (or Node.js 18+)
- **Language**: TypeScript
- **iMessage**: @photon-ai/imessage-kit
- **AI**: OpenAI GPT-4
- **Platform**: macOS only

## 📋 Requirements

### System Requirements
- macOS (any recent version)
- Full Disk Access permission
- Active iMessage account

### Software Requirements
- Bun runtime (or Node.js 18+)
- OpenAI API key (with credits)
- Terminal or IDE

## 🎨 Customization Options

### Easy to Customize

1. **AI Personality**: Edit `src/prompts.ts`
2. **Crisis Keywords**: Modify `src/crisisDetection.ts`
3. **Bot Name**: Change in `.env`
4. **Response Length**: Adjust in `src/config.ts`
5. **Session Timeout**: Update `src/conversationManager.ts`

### Extensibility

The bot is designed for easy extension:
- Add new commands in `messageHandler.ts`
- Implement new features as separate modules
- Plugin system ready (via iMessage SDK)
- Database persistence can be added

## 📈 Potential Enhancements

### Ideas for Future Development

1. **Mood Tracking**
   - Daily mood logging
   - Trend visualization
   - Pattern recognition

2. **Scheduled Check-ins**
   - Proactive wellness messages
   - Morning motivation
   - Evening reflections

3. **Resource Library**
   - Guided meditations
   - Coping technique database
   - Educational articles

4. **Multi-language Support**
   - Internationalization
   - Regional crisis resources
   - Cultural adaptations

5. **Integration Features**
   - Calendar integration
   - Reminder system
   - Journal export

6. **Advanced Analytics**
   - Sentiment analysis
   - Topic clustering
   - Effectiveness metrics

7. **Human Escalation**
   - Alert human moderator
   - Video call scheduling
   - Therapist matching

## 🧪 Testing Recommendations

### Manual Testing Checklist

- [ ] Bot responds to basic messages
- [ ] Commands work (help, start, reset, resources, crisis)
- [ ] Crisis detection triggers correctly
- [ ] Conversation history maintained
- [ ] Sessions expire after 1 hour
- [ ] Graceful shutdown works (Ctrl+C)
- [ ] Error handling works (invalid API key)

### Test Scenarios

1. **Happy Path**: Normal conversation about stress
2. **Crisis Path**: Message with suicide ideation
3. **Command Path**: Test all commands
4. **Error Path**: Disconnect internet, test fallback
5. **Session Path**: Wait 1 hour, verify session reset

## 🚀 Deployment Considerations

### For Production Use

1. **Monitoring**
   - Add structured logging (Winston, Pino)
   - Error tracking (Sentry)
   - Uptime monitoring
   - Alert system for crises

2. **Data Storage**
   - Add database (PostgreSQL, SQLite)
   - Encrypted storage
   - Backup system
   - HIPAA compliance (if applicable)

3. **Scaling**
   - Load balancing (if multiple bots)
   - Rate limiting
   - Caching responses
   - Queue system for high volume

4. **Security**
   - Secure API key storage
   - End-to-end encryption
   - Access controls
   - Regular security audits

5. **Legal & Compliance**
   - Terms of service
   - Privacy policy
   - Consent mechanism
   - Data retention policy
   - Regional regulations (GDPR, CCPA, HIPAA)

## 📝 Code Quality

### Features Implemented

- ✅ TypeScript for type safety
- ✅ Comprehensive error handling
- ✅ Modular architecture
- ✅ Clear separation of concerns
- ✅ Extensive documentation
- ✅ Configuration management
- ✅ Graceful shutdown

### Code Standards

- Consistent naming conventions
- Descriptive variable names
- Commented complex logic
- Error boundaries
- Input validation

## 🎓 Learning Resources

### To Learn More

- **iMessage Kit**: https://github.com/photon-hq/imessage-kit
- **OpenAI API**: https://platform.openai.com/docs
- **Mental Health First Aid**: https://www.mentalhealthfirstaid.org
- **Crisis Text Line**: https://www.crisistextline.org
- **Cognitive Behavioral Therapy**: Beck Institute resources

### Mental Health Resources for Developers

- 988 Suicide & Crisis Lifeline: https://988lifeline.org
- NAMI (National Alliance on Mental Illness): https://nami.org
- Mental Health America: https://mhanational.org
- Crisis Text Line Developer API: https://www.crisistextline.org/developer

## 🤝 Contributing Ideas

If you extend this project, consider:

1. Making prompts more inclusive
2. Adding support for more languages
3. Implementing accessibility features
4. Creating a web dashboard
5. Building analytics tools
6. Adding meditation audio
7. Creating a therapist matching system

## ⚖️ Legal Disclaimer

**IMPORTANT**: This bot is:
- ❌ NOT a replacement for professional therapy
- ❌ NOT for diagnosing mental health conditions
- ❌ NOT for prescribing treatment
- ✅ A supportive tool for general mental wellness
- ✅ A bridge to professional resources
- ✅ For educational and support purposes only

Always include appropriate disclaimers when deploying.

## 📞 Support

For technical issues:
1. Check the README troubleshooting section
2. Review iMessage Kit documentation
3. Check OpenAI API status
4. Review console logs for errors

For mental health support:
- Call/Text 988 (Suicide & Crisis Lifeline)
- Text HOME to 741741 (Crisis Text Line)
- Visit https://findahelpline.com for international resources

## 🎉 Success Criteria

Your bot is working correctly when:
1. ✅ It responds to messages within 5 seconds
2. ✅ Crisis keywords trigger appropriate resources
3. ✅ Conversations feel natural and empathetic
4. ✅ Commands execute properly
5. ✅ No crashes or unhandled errors
6. ✅ Sessions maintain context
7. ✅ Statistics log correctly

## 🌟 Acknowledgments

Built with:
- **iMessage Kit** by Photon AI
- **OpenAI** GPT-4
- **TypeScript** & **Bun**
- Mental health resources from 988 Lifeline and Crisis Text Line

Special consideration for mental health professionals who provide the knowledge base for supportive conversations.

---

**Remember**: This is a support tool, not a replacement for professional care. The goal is to provide immediate, compassionate support and guide users to appropriate resources when needed.

Made with 💙 for mental health support.
