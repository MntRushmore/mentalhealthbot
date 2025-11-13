# Using Hack Club AI with Mental Health Bot

This bot now uses **Qwen 3.5 32B** via Hack Club AI - completely free with no signup required!

## 🎉 What's Great About This

### Free Forever
- **No credit card** required
- **No account** creation needed
- **No usage charges** - truly free
- **Generous limits** for personal/small projects

### Pre-Configured
- API key already included in `.env.example`
- Just `cp .env.example .env` and you're ready
- No configuration needed

### Powerful AI
- **Qwen 3.5 32B** - 32 billion parameter model
- Excellent for conversational AI
- Great at empathetic responses
- Fast response times

## 🔧 Technical Details

### API Endpoint
```
https://ai.hackclub.com/proxy/v1
```

### API Key (Included)
```
ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22
```

### Current Model
```
qwen/qwen3-32b
```

### Usage
The OpenAI SDK is compatible with Hack Club AI's proxy, so we just point it to a different base URL:

```typescript
this.client = new OpenAI({
  apiKey: config.ai.apiKey,
  baseURL: config.ai.baseURL, // https://ai.hackclub.com/proxy/v1
})
```

## 🚀 Available Models

You can easily switch between these free models by changing the model in `src/config.ts`:

### 1. qwen/qwen3-32b (Current)
- **Best for**: General conversation, mental health support
- **Size**: 32B parameters
- **Speed**: Fast
- **Quality**: Excellent for empathetic dialogue

### 2. moonshotai/kimi-k2-thinking
- **Best for**: Complex reasoning, analytical responses
- **Speed**: Moderate
- **Quality**: Great for thought-provoking conversations

### 3. openai/gpt-oss-120b
- **Best for**: Maximum intelligence, complex tasks
- **Size**: 120B parameters (very large!)
- **Speed**: Slower (but powerful)
- **Quality**: Highest quality responses

### 4. moonshotai/kimi-k2-0905
- **Best for**: Quick responses, simple conversations
- **Speed**: Very fast
- **Quality**: Good for straightforward support

### 5. qwen/qwen3-vl-235b-a22b-instruct
- **Best for**: Vision + language tasks (if you add image support)
- **Size**: 235B parameters (massive!)
- **Features**: Can process images + text

## 🔄 How to Switch Models

Edit `src/config.ts`:

```typescript
export const config = {
  ai: {
    apiKey: process.env.AI_API_KEY || 'ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22',
    baseURL: 'https://ai.hackclub.com/proxy/v1',
    model: 'qwen/qwen3-32b', // Change this line!
    maxTokens: 600,
    temperature: 0.7,
  },
}
```

**Example**: Switch to the thinking model:
```typescript
model: 'moonshotai/kimi-k2-thinking',
```

Then restart your bot:
```bash
# Stop the bot (Ctrl+C)
# Start it again
bun run dev
```

## 🧪 Testing Different Models

Want to compare models? Create a test script:

```typescript
// test-models.ts
import { IMessageSDK } from '@photon-ai/imessage-kit'
import OpenAI from 'openai'

const models = [
  'qwen/qwen3-32b',
  'moonshotai/kimi-k2-thinking',
  'openai/gpt-oss-120b',
]

const testPrompt = "I'm feeling anxious today. Can you help?"

for (const model of models) {
  console.log(`\n--- Testing ${model} ---`)
  
  const client = new OpenAI({
    apiKey: 'ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22',
    baseURL: 'https://ai.hackclub.com/proxy/v1',
  })
  
  const response = await client.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: testPrompt }],
    max_tokens: 300,
  })
  
  console.log(response.choices[0].message.content)
}
```

Run: `bun run test-models.ts`

## 📊 Model Comparison

| Model | Speed | Quality | Best For | Params |
|-------|-------|---------|----------|--------|
| **qwen/qwen3-32b** ⭐ | ⚡⚡⚡ | ⭐⭐⭐⭐ | Mental health support | 32B |
| kimi-k2-thinking | ⚡⚡ | ⭐⭐⭐⭐ | Analytical reasoning | ? |
| gpt-oss-120b | ⚡ | ⭐⭐⭐⭐⭐ | Complex conversations | 120B |
| kimi-k2-0905 | ⚡⚡⚡⚡ | ⭐⭐⭐ | Quick responses | ? |
| qwen3-vl-235b | ⚡ | ⭐⭐⭐⭐⭐ | Vision + language | 235B |

⭐ = Current default (recommended)

## 💡 Tips for Best Results

### 1. Adjust Temperature
Different models respond differently to temperature:

```typescript
// More creative/varied responses
temperature: 0.9,

// More focused/consistent responses
temperature: 0.5,

// Current (balanced)
temperature: 0.7,
```

### 2. Adjust Max Tokens
Longer responses need more tokens:

```typescript
maxTokens: 400,  // Shorter responses
maxTokens: 600,  // Current (balanced)
maxTokens: 1000, // Longer, detailed responses
```

### 3. System Prompt Tuning
Different models respond to prompts differently. You might want to adjust `src/prompts.ts` for optimal results with each model.

## 🔒 Rate Limits

Hack Club AI has generous rate limits for free usage:
- Should handle dozens of conversations per hour
- If you hit limits, wait a few minutes
- For heavy usage, consider spreading across models

## 🐛 Troubleshooting

### "Rate limit exceeded"
- Wait 1-2 minutes
- Try switching to a different model temporarily
- The limits are generous - this should be rare

### "Model not found"
- Check spelling: `qwen/qwen3-32b` (lowercase, exact format)
- Ensure you're using one of the supported models listed above
- Check Hack Club AI docs for latest models

### "Invalid API key"
- Use the provided key: `ska2a10e7d8a7e4645bd27fe02dfd26cd866b29e2616704a9abf25c28582c3bc22`
- Ensure no extra spaces in `.env` file
- No quotes around the key

### Slow responses
- Try a faster model: `kimi-k2-0905`
- Reduce `maxTokens` in config
- Check your internet connection

## 🌟 Why Qwen 3.5 32B is Perfect for This

1. **Empathetic**: Trained on diverse conversational data
2. **Fast**: 32B params = good balance of speed/quality
3. **Reliable**: Consistent, appropriate responses
4. **Context-aware**: Handles conversation history well
5. **Safe**: Good at following safety guidelines

## 📚 Learn More

- **Hack Club AI**: https://ai.hackclub.com
- **Qwen Models**: https://github.com/QwenLM/Qwen
- **API Docs**: https://ai.hackclub.com/docs (if available)

## 🤝 Credits

Huge thanks to **Hack Club** for providing free AI API access! This makes mental health support bots accessible to everyone. 💙

---

**Using this bot?** Share your experience and help others in the mental health + AI community!
