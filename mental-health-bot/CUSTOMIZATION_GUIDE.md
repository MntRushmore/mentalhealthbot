# Customization Guide

Learn how to customize your mental health bot to fit your needs.

## Table of Contents

1. [Changing AI Personality](#changing-ai-personality)
2. [Adding Custom Commands](#adding-custom-commands)
3. [Implementing Mood Tracking](#implementing-mood-tracking)
4. [Adding Coping Techniques](#adding-coping-techniques)
5. [Customizing Crisis Detection](#customizing-crisis-detection)
6. [Using Different AI Models](#using-different-ai-models)

## Changing AI Personality

Edit `src/prompts.ts` to change how the bot responds:

### Make it More Casual

```typescript
export const systemPrompt = `You're a supportive friend who happens to know a lot about mental health. Keep it real, use casual language, and be like a buddy who genuinely cares.

Talk like:
- "Hey, that sounds really tough 😔"
- "Wanna try something that might help?"
- "I'm here for you, friend"

Keep it short - this is texting, not therapy sessions!`
```

### Make it More Professional

```typescript
export const systemPrompt = `You are a professional mental health support assistant providing evidence-based guidance. Maintain a compassionate yet professional tone.

Communication guidelines:
- Use professional language while remaining warm
- Reference specific techniques (e.g., "This is called cognitive reframing")
- Provide structured responses
- Always cite when using clinical information`
```

### Add Humor (Carefully!)

```typescript
export const systemPrompt = `You're a supportive mental health companion with a gentle sense of humor. Use light humor when appropriate to ease tension, but ALWAYS be sensitive to the user's emotional state.

Rules for humor:
- Never joke about serious topics (suicide, self-harm, trauma)
- Use humor only when user seems receptive
- Self-deprecating humor is safer than other types
- When in doubt, skip the joke`
```

## Adding Custom Commands

Edit `src/messageHandler.ts` to add new commands:

### Add a "breathing" Command

```typescript
// In parseCommand method, add to commands array:
const commands = ['help', 'start', 'reset', 'resources', 'crisis', 'breathing']

// In handleCommand method, add new case:
case 'breathing':
  return this.getBreathingExercise()

// Add new method to MessageHandler class:
private getBreathingExercise(): string {
  return `🌬️ **4-7-8 Breathing Exercise**

Let's calm your nervous system together:

1️⃣ **Breathe IN** through your nose for 4 counts
   (1... 2... 3... 4...)

2️⃣ **HOLD** your breath for 7 counts
   (1... 2... 3... 4... 5... 6... 7...)

3️⃣ **Breathe OUT** through your mouth for 8 counts
   (1... 2... 3... 4... 5... 6... 7... 8...)

Repeat 4 times. 

How are you feeling? 💙`
}
```

### Add a "journal" Command

```typescript
case 'journal':
  return this.getJournalPrompt()

private getJournalPrompt(): string {
  const prompts = [
    "What are 3 things you're grateful for today?",
    "What emotion are you feeling right now? Can you describe where you feel it in your body?",
    "What would you tell a friend going through what you're experiencing?",
    "What's one small thing that made you smile today?",
    "If your anxiety/stress could talk, what would it say?",
  ]
  
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
  
  return `📝 **Journal Prompt**

${randomPrompt}

Take your time. There's no wrong answer. Writing can help process emotions and gain clarity.

Would you like to share your thoughts, or would you prefer another prompt?`
}
```

## Implementing Mood Tracking

Create a new file `src/moodTracker.ts`:

```typescript
export interface MoodEntry {
  userId: string
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  timestamp: Date
  note?: string
}

export class MoodTracker {
  private moods: Map<string, MoodEntry[]> = new Map()

  logMood(userId: string, mood: MoodEntry['mood'], note?: string): void {
    if (!this.moods.has(userId)) {
      this.moods.set(userId, [])
    }

    this.moods.get(userId)!.push({
      userId,
      mood,
      timestamp: new Date(),
      note,
    })
  }

  getMoodHistory(userId: string, days: number = 7): MoodEntry[] {
    const userMoods = this.moods.get(userId) || []
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return userMoods.filter(entry => entry.timestamp >= cutoffDate)
  }

  getMoodTrend(userId: string): string {
    const recentMoods = this.getMoodHistory(userId, 7)
    
    if (recentMoods.length < 2) {
      return 'Not enough data yet'
    }

    const moodValues: Record<MoodEntry['mood'], number> = {
      terrible: 1,
      bad: 2,
      okay: 3,
      good: 4,
      great: 5,
    }

    const avgRecent = recentMoods.slice(-3).reduce((sum, entry) => 
      sum + moodValues[entry.mood], 0
    ) / 3

    const avgPrevious = recentMoods.slice(-6, -3).reduce((sum, entry) => 
      sum + moodValues[entry.mood], 0
    ) / 3

    if (avgRecent > avgPrevious + 0.5) return 'improving ↗️'
    if (avgRecent < avgPrevious - 0.5) return 'declining ↘️'
    return 'stable →'
  }

  generateMoodReport(userId: string): string {
    const history = this.getMoodHistory(userId, 7)
    const trend = this.getMoodTrend(userId)

    if (history.length === 0) {
      return "No mood data yet. Use 'mood' command to start tracking!"
    }

    const moodCounts: Record<string, number> = {}
    for (const entry of history) {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1
    }

    return `📊 **Your Mood This Week**

Trend: ${trend}

${Object.entries(moodCounts)
  .map(([mood, count]) => `${mood}: ${count} day${count > 1 ? 's' : ''}`)
  .join('\n')}

Keep tracking to see patterns! 💙`
  }
}
```

Then add to `MessageHandler`:

```typescript
import { MoodTracker } from './moodTracker.js'

export class MessageHandler {
  private moodTracker: MoodTracker

  constructor() {
    this.aiService = new AIService()
    this.conversationManager = new ConversationManager()
    this.moodTracker = new MoodTracker()
  }

  // Add mood command
  case 'mood':
    return this.handleMoodCommand(userId)

  private handleMoodCommand(userId: string): string {
    return `How are you feeling today?

Reply with:
• **great** - Feeling amazing!
• **good** - Pretty good
• **okay** - Meh, getting by
• **bad** - Not great
• **terrible** - Really struggling

Or use 'mood report' to see your trend`
  }

  // Detect mood responses
  private detectMoodResponse(message: string): MoodEntry['mood'] | null {
    const lowerMessage = message.toLowerCase().trim()
    
    if (['great', 'amazing', 'wonderful'].includes(lowerMessage)) return 'great'
    if (['good', 'fine', 'pretty good'].includes(lowerMessage)) return 'good'
    if (['okay', 'ok', 'meh', 'alright'].includes(lowerMessage)) return 'okay'
    if (['bad', 'not good', 'poor'].includes(lowerMessage)) return 'bad'
    if (['terrible', 'awful', 'horrible'].includes(lowerMessage)) return 'terrible'
    
    return null
  }
}
```

## Adding Coping Techniques

Create `src/copingTechniques.ts`:

```typescript
export interface CopingTechnique {
  name: string
  description: string
  instructions: string
  duration: string
  category: 'breathing' | 'grounding' | 'cognitive' | 'physical'
}

export const copingTechniques: CopingTechnique[] = [
  {
    name: '5-4-3-2-1 Grounding',
    category: 'grounding',
    duration: '2-3 minutes',
    description: 'Brings you back to the present moment',
    instructions: `Look around and identify:
• 5 things you can SEE
• 4 things you can TOUCH
• 3 things you can HEAR
• 2 things you can SMELL
• 1 thing you can TASTE

Take your time with each sense.`,
  },
  {
    name: 'Box Breathing',
    category: 'breathing',
    duration: '2-5 minutes',
    description: 'Used by Navy SEALs to stay calm',
    instructions: `Follow this pattern:
1. Breathe IN for 4 counts
2. HOLD for 4 counts
3. Breathe OUT for 4 counts
4. HOLD for 4 counts

Repeat 4-5 times.`,
  },
  {
    name: 'Thought Challenging',
    category: 'cognitive',
    duration: '5-10 minutes',
    description: 'Reframe negative thoughts',
    instructions: `Ask yourself:
1. What's the thought?
2. What's the evidence FOR it?
3. What's the evidence AGAINST it?
4. What's a more balanced thought?

Example:
❌ "Everyone hates me"
✅ "Some people might be upset, but I have friends who care"`,
  },
  {
    name: 'Progressive Muscle Relaxation',
    category: 'physical',
    duration: '5-10 minutes',
    description: 'Release physical tension',
    instructions: `Tense and relax each muscle group:
1. Feet - curl toes, hold 5 sec, release
2. Legs - tighten, hold, release
3. Stomach - tighten, hold, release
4. Hands - make fists, hold, release
5. Arms - flex, hold, release
6. Shoulders - raise to ears, hold, release
7. Face - scrunch, hold, release

Notice the difference between tension and relaxation.`,
  },
]

export function getCopingTechnique(category?: string): CopingTechnique {
  const filtered = category
    ? copingTechniques.filter(t => t.category === category)
    : copingTechniques

  return filtered[Math.floor(Math.random() * filtered.length)]
}

export function formatTechnique(technique: CopingTechnique): string {
  return `🧘 **${technique.name}**

${technique.description}

⏱️ Duration: ${technique.duration}

**Instructions:**
${technique.instructions}

Try it now and let me know how it goes! 💙`
}
```

Add command:

```typescript
case 'coping':
case 'technique':
  const technique = getCopingTechnique()
  return formatTechnique(technique)

case 'breathe':
  const breathing = getCopingTechnique('breathing')
  return formatTechnique(breathing)

case 'ground':
  const grounding = getCopingTechnique('grounding')
  return formatTechnique(grounding)
```

## Customizing Crisis Detection

Edit `src/crisisDetection.ts`:

### Add More Keywords

```typescript
export const crisisKeywords = [
  // Suicide-related
  'suicide', 'suicidal', 'kill myself', 'end my life',
  'want to die', 'better off dead', 'no reason to live',
  
  // Self-harm
  'self harm', 'hurt myself', 'cut myself', 'cutting',
  
  // Substance abuse indicators
  'overdose', 'od', 'pills', 'drink until',
  
  // Violence indicators  
  'hurt someone', 'hurt others', 'violent thoughts',
  
  // Add your own keywords based on your needs
]
```

### Adjust Sensitivity

```typescript
// In detectCrisis function, modify thresholds:

if (hasHighSeverityPhrase || matchedKeywords.length >= 2) { // Was 3
  severity = 'high'
} else if (matchedKeywords.length >= 1) { // Was 2
  severity = 'medium'
}
```

### Add Context-Aware Detection

```typescript
export function detectCrisis(
  message: string, 
  conversationHistory?: string[]
): CrisisDetectionResult {
  // Check recent context
  const recentContext = conversationHistory?.slice(-5).join(' ').toLowerCase() || ''
  
  // Lower threshold if previous messages indicated distress
  const hasRecentDistress = recentContext.includes('depressed') || 
                           recentContext.includes('hopeless')
  
  // Adjust detection based on context...
}
```

## Using Different AI Models

### Switch to GPT-3.5 (Cheaper)

```typescript
// In src/config.ts
export const config = {
  openai: {
    model: 'gpt-3.5-turbo', // Faster and cheaper
    maxTokens: 400,
    temperature: 0.7,
  },
}
```

### Use Claude (Anthropic)

Replace `src/aiService.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk'

export class AIService {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: ConversationHistory[]
  ): Promise<string> {
    const messages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }))

    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      system: systemPrompt,
      messages: [...messages, { role: 'user', content: userMessage }],
    })

    return response.content[0].text
  }
}
```

### Use Local LLM (Ollama)

```typescript
import { Ollama } from 'ollama'

export class AIService {
  private ollama: Ollama

  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' })
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: ConversationHistory[]
  ): Promise<string> {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ]

    const response = await this.ollama.chat({
      model: 'llama2', // or 'mistral', 'neural-chat', etc.
      messages,
    })

    return response.message.content
  }
}
```

## Testing Your Customizations

Create a test script `test-bot.ts`:

```typescript
import { MessageHandler } from './src/messageHandler.js'

async function testBot() {
  const handler = new MessageHandler()

  const testMessages = [
    "help",
    "I'm feeling anxious",
    "breathing",
    "Can you teach me a coping technique?",
  ]

  for (const msg of testMessages) {
    console.log(`\n👤 User: ${msg}`)
    
    const response = await handler.handleMessage({
      sender: 'test-user',
      text: msg,
    } as any)
    
    console.log(`🤖 Bot: ${response}`)
    console.log('---')
  }
}

testBot()
```

Run: `bun run test-bot.ts`

## Best Practices

1. **Always test changes** before deploying
2. **Keep crisis detection sensitive** - false positives are better than missed crises
3. **Log important events** for monitoring
4. **Update prompts gradually** - test each change
5. **Respect privacy** - don't log sensitive content
6. **Document customizations** - future you will thank you!

---

Need help with customization? Check the main README or the iMessage Kit documentation!
