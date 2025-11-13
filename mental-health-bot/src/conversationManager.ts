import type { Message } from '@photon-ai/imessage-kit'

export interface ConversationHistory {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export class ConversationManager {
  private conversations: Map<string, ConversationHistory[]> = new Map()
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
}
