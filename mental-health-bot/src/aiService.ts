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
    return `Hey. I'm ${config.bot.name}.

Think of me like a bouncer for your mental space - I'm here to keep things safe, real, and grounded.

What's going on?

(Real talk: I'm AI, not a therapist. For serious stuff, hit up a pro. For everything else, I got you.)`
  }

  /**
   * Generate a help message
   */
  getHelpMessage(): string {
    return `Here's what I do:

💬 Real talk about what's on your mind
🧘 Quick tools (breathing, grounding, reframing)
🛡️ Keep your mental space safe
📚 Connect you to real help when needed

Just text me. No commands needed.

Commands if you want em:
→ start - fresh convo
→ reset - clear history  
→ crisis - emergency numbers
→ resources - mental health support

I'm support, not therapy. But I'm here.`
  }
}
