import type { Message } from '@photon-ai/imessage-kit'

export interface ConversationHistory {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export class ConversationManager {
  private conversations: Map<string, ConversationHistory[]> = new Map()
  private processedMessages: Map<string, Set<string>> = new Map() // Track processed message IDs
  private readonly maxHistoryLength = 20 // Keep last 20 messages per user
  private readonly sessionTimeout = 3600000 // 1 hour in milliseconds

  /**
   * Add a message to conversation history
   */
  addMessage(userId: string, role: 'user' | 'assistant', content: string): void {
    if (!this.conversations.has(userId)) {
      this.conversations.set(userId, [])
    }

    const history = this.conversations.get(userId)!
    history.push({
      role,
      content,
      timestamp: new Date(),
    })

    // Keep only recent messages
    if (history.length > this.maxHistoryLength) {
      history.shift()
    }
  }

  /**
   * Get conversation history for a user
   */
  getHistory(userId: string): ConversationHistory[] {
    this.cleanupOldSessions()
    return this.conversations.get(userId) || []
  }

  /**
   * Format history for OpenAI API
   */
  getFormattedHistory(userId: string): Array<{ role: string; content: string }> {
    const history = this.getHistory(userId)
    return history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))
  }

  /**
   * Clear history for a specific user
   */
  clearHistory(userId: string): void {
    this.conversations.delete(userId)
  }

  /**
   * Remove old sessions that have expired
   */
  private cleanupOldSessions(): void {
    const now = new Date().getTime()

    for (const [userId, history] of this.conversations.entries()) {
      if (history.length === 0) continue

      const lastMessage = history[history.length - 1]
      const timeSinceLastMessage = now - lastMessage.timestamp.getTime()

      if (timeSinceLastMessage > this.sessionTimeout) {
        this.conversations.delete(userId)
      }
    }
  }

  /**
   * Get conversation summary for monitoring
   */
  getStats(): {
    activeConversations: number
    totalMessages: number
  } {
    this.cleanupOldSessions()

    let totalMessages = 0
    for (const history of this.conversations.values()) {
      totalMessages += history.length
    }

    return {
      activeConversations: this.conversations.size,
      totalMessages,
    }
  }

  /**
   * Check if this is a new conversation (first interaction)
   */
  isNewConversation(userId: string): boolean {
    const history = this.getHistory(userId)
    return history.length === 0
  }

  /**
   * Check if we've already processed this message
   */
  hasProcessedMessage(userId: string, messageId: string): boolean {
    if (!this.processedMessages.has(userId)) {
      this.processedMessages.set(userId, new Set())
    }
    return this.processedMessages.get(userId)!.has(messageId)
  }

  /**
   * Mark a message as processed
   */
  markMessageProcessed(userId: string, messageId: string): void {
    if (!this.processedMessages.has(userId)) {
      this.processedMessages.set(userId, new Set())
    }
    this.processedMessages.get(userId)!.add(messageId)

    // Clean up old processed messages (keep last 100 per user)
    const processed = this.processedMessages.get(userId)!
    if (processed.size > 100) {
      const toRemove = Array.from(processed).slice(0, processed.size - 100)
      toRemove.forEach(id => processed.delete(id))
    }
  }
}
