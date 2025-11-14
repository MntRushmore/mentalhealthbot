import type { Message } from '@photon-ai/imessage-kit'
import { AIService } from './aiService.js'
import { ConversationManager } from './conversationManager.js'
import { detectCrisis, getCrisisResponse, logCrisisDetection } from './crisisDetection.js'

export class MessageHandler {
  private aiService: AIService
  private conversationManager: ConversationManager

  constructor() {
    this.aiService = new AIService()
    this.conversationManager = new ConversationManager()
  }

  /**
   * Process an incoming message and generate a response
   */
  async handleMessage(message: Message): Promise<string> {
    const userId = message.sender
    const userMessage = message.text || ''
    const messageId = message.id || message.guid

    // Skip empty messages
    if (!userMessage.trim()) {
      return ''
    }

    // Prevent duplicate processing (fixes spam issue!)
    if (this.conversationManager.hasProcessedMessage(userId, messageId)) {
      console.log(`⏭️  Skipping duplicate message: ${messageId}`)
      return ''
    }

    // Mark as processed immediately
    this.conversationManager.markMessageProcessed(userId, messageId)

    console.log(`📨 Message from ${userId}: ${userMessage}`)

    // Check for commands
    const command = this.parseCommand(userMessage)
    if (command) {
      return await this.handleCommand(command, userId)
    }

    // Crisis detection
    const crisisDetection = detectCrisis(userMessage)
    if (crisisDetection.isCrisis) {
      logCrisisDetection(userId, userMessage, crisisDetection)

      // Add to conversation history
      this.conversationManager.addMessage(userId, 'user', userMessage)

      // Return crisis response
      const crisisResponse = getCrisisResponse(crisisDetection.severity)
      this.conversationManager.addMessage(userId, 'assistant', crisisResponse)

      return crisisResponse
    }

    // Check if this is a new conversation
    const isNewConversation = this.conversationManager.isNewConversation(userId)

    // Add user message to history
    this.conversationManager.addMessage(userId, 'user', userMessage)

    try {
      // Generate AI response
      const history = this.conversationManager.getHistory(userId)
      const aiResponse = await this.aiService.generateResponse(
        userMessage,
        history,
        isNewConversation
      )

      // Add AI response to history
      this.conversationManager.addMessage(userId, 'assistant', aiResponse)

      console.log(`🤖 Response: ${aiResponse}`)

      return aiResponse
    } catch (error) {
      console.error('Error handling message:', error)
      return "I'm having trouble responding right now. If you're in crisis, please call 988 or text HOME to 741741."
    }
  }

  /**
   * Parse command from message
   */
  private parseCommand(message: string): string | null {
    const lowerMessage = message.toLowerCase().trim()

    const commands = ['help', 'start', 'reset', 'resources', 'crisis']

    for (const cmd of commands) {
      if (
        lowerMessage === cmd ||
        lowerMessage === `/${cmd}` ||
        lowerMessage === `!${cmd}`
      ) {
        return cmd
      }
    }

    return null
  }

  /**
   * Handle bot commands
   */
  private async handleCommand(command: string, userId: string): Promise<string> {
    switch (command) {
      case 'help':
        return this.aiService.getHelpMessage()

      case 'start':
        this.conversationManager.clearHistory(userId)
        return this.aiService.getGreeting()

      case 'reset':
        this.conversationManager.clearHistory(userId)
        return 'Reset. Fresh start. What\'s up?'

      case 'resources':
        return this.getResourcesMessage()

      case 'crisis':
        return getCrisisResponse('low')

      default:
        return ''
    }
  }

  /**
   * Get mental health resources message
   */
  private getResourcesMessage(): string {
    return `🛡️ RESOURCES

Crisis (24/7):
→ 988 or text HOME to 741741
→ 911 for emergencies

Find a Therapist:
→ psychologytoday.com/us/therapists
→ SAMHSA: 1-800-662-4357
→ NAMI: 1-800-950-6264

Apps Worth Checking:
→ Headspace / Calm (meditation)
→ Sanvello (mood tracking)
→ BetterHelp (online therapy)

Real help exists. Use it.`
  }

  /**
   * Get conversation statistics
   */
  getStats() {
    return this.conversationManager.getStats()
  }
}
