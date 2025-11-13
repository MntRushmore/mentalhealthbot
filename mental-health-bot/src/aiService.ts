import OpenAI from 'openai'
import { config } from './config.js'
import { systemPrompt, conversationContext } from './prompts.js'
import type { ConversationHistory } from './conversationManager.js'

export class AIService {
  private client: OpenAI

  constructor() {
    // Initialize OpenAI-compatible client for Hack Club AI proxy
    this.client = new OpenAI({
      apiKey: config.ai.apiKey,
      baseURL: config.ai.baseURL,
    })
    console.log('🤖 AI Service initialized with Qwen 3.5 32B')
  }

  /**
   * Generate a response using OpenAI
   */
  async generateResponse(
    userMessage: string,
    conversationHistory: ConversationHistory[],
    isNewConversation: boolean
  ): Promise<string> {
    try {
      // Build messages array for OpenAI
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        {
          role: 'system',
          content: isNewConversation ? systemPrompt : `${systemPrompt}\n\n${conversationContext}`,
        },
      ]

      // Add conversation history
      for (const msg of conversationHistory) {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })
      }

      // Add current message if not already in history
      const lastHistoryMessage = conversationHistory[conversationHistory.length - 1]
      if (!lastHistoryMessage || lastHistoryMessage.content !== userMessage) {
        messages.push({
          role: 'user',
          content: userMessage,
        })
      }

      // Call AI API (Qwen 3.5 32B via Hack Club)
      const response = await this.client.chat.completions.create({
        model: config.ai.model,
        messages: messages,
        max_tokens: config.ai.maxTokens,
        temperature: config.ai.temperature,
      })

      const aiMessage = response.choices[0]?.message?.content

      if (!aiMessage) {
        throw new Error('No response from AI')
      }

      return aiMessage.trim()
    } catch (error) {
      console.error('Error generating AI response:', error)

      // Fallback response
      return this.getFallbackResponse(error)
    }
  }

  /**
   * Get a fallback response when AI fails
   */
  private getFallbackResponse(error: unknown): string {
    if (error instanceof Error && error.message.includes('rate limit')) {
      return "I'm experiencing high volume right now. Please give me a moment and try again. If this is urgent, please reach out to a crisis line: Text 988 or call 1-800-273-8255."
    }

    return "I'm having trouble responding right now. If you're in crisis, please reach out for immediate help: Call/Text 988 (Suicide & Crisis Lifeline). I'll be back soon."
  }

  /**
   * Generate a greeting message for new conversations
   */
  getGreeting(): string {
    return `Hi! I'm ${config.bot.name}, your mental health support companion. 🌟

I'm here to listen and support you. You can talk to me about anything on your mind - anxiety, stress, relationships, or just how you're feeling.

How are you doing today?

*(Note: I'm an AI assistant, not a therapist. For professional help or crisis support, please reach out to appropriate resources.)*`
  }

  /**
   * Generate a help message
   */
  getHelpMessage(): string {
    return `Here's how I can help:

💬 **Talk to me** about what's on your mind
🧘 **Learn techniques** for managing stress/anxiety
🤝 **Get support** with difficult emotions
📚 **Explore resources** for mental wellness

You can ask me:
- "I'm feeling anxious, can you help?"
- "Can you teach me a breathing exercise?"
- "I'm having a hard day"
- "How do I deal with stress?"

Remember: I'm here to support you, but I'm not a replacement for professional therapy.

What would you like to talk about?`
  }
}
