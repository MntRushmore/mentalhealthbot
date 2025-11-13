# Setup Checklist - Mental Health iMessage Bot

Complete these steps to get your bot running!

## ☐ Pre-Installation (5 minutes)

### 1. System Check
- [ ] Verify you're on macOS
- [ ] Check you have an active iMessage account
- [ ] Ensure you have terminal access

### 2. Install Bun Runtime
```bash
curl -fsSL https://bun.sh/install | bash
```
- [ ] Bun installed successfully
- [ ] Restart terminal after installation
- [ ] Verify: `bun --version`

### 3. Get OpenAI API Key
1. [ ] Go to https://platform.openai.com
2. [ ] Create account or sign in
3. [ ] Navigate to API Keys section
4. [ ] Click "Create new secret key"
5. [ ] Copy the key (starts with `sk-`)
6. [ ] Save it somewhere safe (you'll need it soon!)

**Cost estimate**: ~$0.01-0.05 per conversation (depending on length)

## ☐ Installation (5 minutes)

### 4. Navigate to Project
```bash
cd /path/to/mental-health-bot
```
- [ ] In the correct directory
- [ ] Can see `src/` folder and `package.json`

### 5. Install Dependencies
```bash
bun install
```
- [ ] Dependencies installed without errors
- [ ] `node_modules/` folder created

### 6. Configure Environment
```bash
# Copy example file
cp .env.example .env

# Edit the file
nano .env
```

Add your settings:
```env
OPENAI_API_KEY=sk-your-actual-key-here
BOT_NAME=MindfulBot
```

- [ ] `.env` file created
- [ ] API key added (no quotes needed)
- [ ] File saved

**Tip**: Press Ctrl+X, then Y, then Enter to save in nano

## ☐ Permissions (5 minutes)

### 7. Grant Full Disk Access

This is **CRITICAL** - the bot can't work without this!

#### For Terminal Users:
1. [ ] Open **System Settings**
2. [ ] Click **Privacy & Security**
3. [ ] Click **Full Disk Access** in the left sidebar
4. [ ] Click the **🔒 lock icon** to make changes
5. [ ] Enter your password
6. [ ] Click the **+** button
7. [ ] Navigate to `/Applications/Utilities/`
8. [ ] Select **Terminal.app** (or iTerm, Warp, etc.)
9. [ ] Enable the checkbox next to Terminal
10. [ ] Click the 🔒 lock icon again to prevent changes
11. [ ] **Restart your terminal**

#### For IDE Users (VS Code, Cursor, Zed):
1. [ ] Follow steps 1-6 above
2. [ ] Navigate to `/Applications/`
3. [ ] Select your IDE (e.g., `Visual Studio Code.app`)
4. [ ] Enable the checkbox
5. [ ] **Restart your IDE**

**Verify permission granted**:
```bash
ls ~/Library/Messages/chat.db
```
- [ ] File path shown (permission granted)
- [ ] No "Permission denied" error

## ☐ First Run (2 minutes)

### 8. Start the Bot
```bash
bun run dev
```

Expected output:
```
🤖 Starting Mental Health iMessage Bot...
📱 Bot Name: MindfulBot
⏳ Initializing...

✅ Bot is running and watching for messages!
💬 Send a message to start a conversation
```

- [ ] Bot started without errors
- [ ] "Bot is running" message displayed
- [ ] No red error text

### 9. Test the Bot

**Send yourself an iMessage**:
1. [ ] Open Messages app on your Mac
2. [ ] Start a new message to yourself
3. [ ] Type: `hello`
4. [ ] Send the message
5. [ ] Wait 3-5 seconds

**Check the terminal**:
- [ ] See "📨 New DM from [your number]"
- [ ] See "🤖 Response: ..."
- [ ] Bot sends you a reply in Messages

**Check iMessage**:
- [ ] Received response from yourself
- [ ] Message is conversational and helpful

## ☐ Verify Features (5 minutes)

### 10. Test Commands

Send these messages and verify responses:

| Command | Expected Response | ✓ |
|---------|------------------|---|
| `help` | Shows help message with capabilities | [ ] |
| `start` | Shows greeting message | [ ] |
| `resources` | Lists mental health resources | [ ] |
| `crisis` | Shows crisis hotline info | [ ] |
| `reset` | Confirms conversation reset | [ ] |

### 11. Test Conversations

Try these conversation starters:

| Message | Expected Behavior | ✓ |
|---------|------------------|---|
| "I'm feeling anxious" | Empathetic response about anxiety | [ ] |
| "Can you help me relax?" | Offers breathing/grounding technique | [ ] |
| "Tell me about yourself" | Explains it's an AI support bot | [ ] |

### 12. Test Crisis Detection

**WARNING**: This will trigger crisis resources

Send: "I'm thinking about suicide"

Expected:
- [ ] Immediate crisis resource response
- [ ] Lists 988 hotline
- [ ] Lists Crisis Text Line
- [ ] Empathetic, urgent tone
- [ ] Console shows: "🚨 CRISIS DETECTED 🚨"

## ☐ Troubleshooting

### Common Issues

#### Bot Not Responding
```
No response from bot after sending message
```
**Solutions**:
- [ ] Check bot is still running (look at terminal)
- [ ] Verify Full Disk Access granted
- [ ] Restart terminal and bot
- [ ] Wait full 5 seconds after sending message

#### Permission Denied
```
Error: EACCES: permission denied, open '~/Library/Messages/chat.db'
```
**Solutions**:
- [ ] Grant Full Disk Access (see step 7)
- [ ] Restart terminal completely
- [ ] Verify: `ls ~/Library/Messages/chat.db`

#### OpenAI API Error
```
Error: Invalid API key
```
**Solutions**:
- [ ] Check `.env` file has correct key
- [ ] Ensure key starts with `sk-`
- [ ] No quotes around the key in `.env`
- [ ] No spaces before/after the key

```
Error: Rate limit exceeded
```
**Solutions**:
- [ ] Wait 1-2 minutes
- [ ] Check OpenAI account has credits
- [ ] Upgrade OpenAI plan if needed

#### Module Not Found
```
Error: Cannot find module 'openai'
```
**Solutions**:
- [ ] Run `bun install` again
- [ ] Check `node_modules/` folder exists
- [ ] Try `rm -rf node_modules && bun install`

## ☐ Production Readiness (Optional)

### For Ongoing Use

#### 13. Set Up as Service (macOS)

Create a LaunchAgent to run bot automatically:

```bash
# Coming soon - see documentation
```

#### 14. Monitor & Log

- [ ] Set up log file rotation
- [ ] Monitor for errors
- [ ] Track crisis detections
- [ ] Review conversations periodically

#### 15. Customize

- [ ] Read CUSTOMIZATION_GUIDE.md
- [ ] Adjust personality in `src/prompts.ts`
- [ ] Add custom commands
- [ ] Modify crisis keywords for your needs

## ✅ Success!

You're ready when:
- [x] Bot responds to messages within 5 seconds
- [x] All commands work correctly
- [x] Crisis detection triggers appropriately
- [x] Conversations feel natural
- [x] No errors in console

## 📞 Getting Help

If you're stuck:

1. **Check Documentation**
   - [ ] Read README.md
   - [ ] Review QUICK_START.md
   - [ ] Check troubleshooting section

2. **Check Logs**
   - [ ] Look at terminal output
   - [ ] Note any error messages
   - [ ] Check file paths in errors

3. **Verify Setup**
   - [ ] OpenAI API key is valid
   - [ ] Full Disk Access granted
   - [ ] Bun is installed
   - [ ] Dependencies installed

4. **Test Components**
   - [ ] Test OpenAI API separately
   - [ ] Verify iMessage database access
   - [ ] Check file permissions

## 🎉 Next Steps

Once your bot is running:

1. **Customize It**: Edit `src/prompts.ts` to change personality
2. **Add Features**: See CUSTOMIZATION_GUIDE.md for ideas
3. **Monitor It**: Watch console logs for issues
4. **Share Feedback**: What features would you like?

---

**Need Help?**
- 📚 Read the full README.md
- 🎨 Check CUSTOMIZATION_GUIDE.md
- 📊 Review PROJECT_SUMMARY.md

**Mental Health Resources:**
- 🆘 Call/Text 988 (Suicide & Crisis Lifeline)
- 💬 Text HOME to 741741 (Crisis Text Line)

Made with 💙 for mental health support
