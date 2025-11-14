#!/usr/bin/env bun
import { IMessageSDK } from '@photon-ai/imessage-kit'
import { config, validateConfig } from './config.js'
import { MessageHandler } from './messageHandler.js'

class MentalHealthBot {
  private sdk: IMessageSDK
  private messageHandler: MessageHandler
  private isRunning = false

  constructor() {
    // Validate configuration
    validateConfig()

    // Initialize iMessage SDK
    this.sdk = new IMessageSDK({
      debug: config.imessage.debug,
      maxConcurrent: config.imessage.maxConcurrent,
      watcher: config.imessage.watcher,
      webhook: config.webhook,
    })

    // Initialize message handler
    this.messageHandler = new MessageHandler()
  }

  /**
   * Start the bot
   */
  async start(): Promise<void> {
    try {
      console.log('🤖 Starting Mental Health iMessage Bot...')
      console.log(`📱 Bot Name: ${config.bot.name}`)
      console.log('⏳ Initializing...\n')

      // Start watching for messages
      await this.sdk.startWatching({
        onDirectMessage: async (message) => {
          await this.handleDirectMessage(message)
        },
        onGroupMessage: async (message) => {
          await this.handleGroupMessage(message)
        },
        onError: (error) => {
          console.error('❌ Watcher error:', error)
        },
      })

      this.isRunning = true
      console.log('✅ Bot is running and watching for messages!')
      console.log('💬 Send a message to start a conversation')
      console.log('📊 Statistics will be logged every 5 minutes')
      console.log('⛔ Press Ctrl+C to stop\n')

      // Log statistics periodically
      this.startStatsLogger()
    } catch (error) {
      console.error('❌ Failed to start bot:', error)
      throw error
    }
  }

  /**
   * Handle direct messages
   */
  private async handleDirectMessage(message: any): Promise<void> {
    try {
      // Generate response
      const response = await this.messageHandler.handleMessage(message)

      // Send response if we have one
      if (response) {
        await this.sdk.send(message.sender, response)
        console.log(`✅ Sent to ${message.sender}`)
      }
    } catch (error) {
      console.error('❌ Error handling DM:', error)

      // Send error message to user
      try {
        await this.sdk.send(
          message.sender,
          "I'm having trouble right now. If this is urgent, please call 988 or text HOME to 741741."
        )
      } catch (sendError) {
        console.error('❌ Failed to send error message:', sendError)
      }
    }
  }

  /**
   * Handle group messages
   */
  private async handleGroupMessage(message: any): Promise<void> {
    // For now, we'll only respond to DMs for privacy
    // You can customize this to respond in certain group chats
    console.log(`📱 Group message received (ignored): ${message.chatId}`)
  }

  /**
   * Start logging statistics
   */
  private startStatsLogger(): void {
    setInterval(() => {
      if (!this.isRunning) return

      const stats = this.messageHandler.getStats()
      console.log('\n📊 Bot Statistics:')
      console.log(`   Active Conversations: ${stats.activeConversations}`)
      console.log(`   Total Messages: ${stats.totalMessages}`)
      console.log(`   Timestamp: ${new Date().toLocaleString()}\n`)
    }, 5 * 60 * 1000) // Every 5 minutes
  }

  /**
   * Stop the bot
   */
  async stop(): Promise<void> {
    console.log('\n⏳ Stopping bot...')
    this.isRunning = false

    try {
      this.sdk.stopWatching()
      await this.sdk.close()
      console.log('✅ Bot stopped successfully')
    } catch (error) {
      console.error('❌ Error stopping bot:', error)
    }
  }
}

// Main execution
async function main() {
  const bot = new MentalHealthBot()

  // Handle shutdown signals
  process.on('SIGINT', async () => {
    console.log('\n⚠️  Received SIGINT signal')
    await bot.stop()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('\n⚠️  Received SIGTERM signal')
    await bot.stop()
    process.exit(0)
  })

  // Handle uncaught errors
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error)
  })

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason)
  })

  // Start the bot
  try {
    await bot.start()
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the bot
main().catch((error) => {
  console.error('❌ Failed to start bot:', error)
  process.exit(1)
})
