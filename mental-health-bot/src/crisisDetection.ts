import { crisisKeywords } from './prompts.js'
import { config } from './config.js'

export interface CrisisDetectionResult {
  isCrisis: boolean
  severity: 'low' | 'medium' | 'high'
  matchedKeywords: string[]
}

/**
 * Detect potential crisis situations in messages
 */
export function detectCrisis(message: string): CrisisDetectionResult {
  const lowerMessage = message.toLowerCase()
  const matchedKeywords: string[] = []

  // Check for crisis keywords
  for (const keyword of crisisKeywords) {
    if (lowerMessage.includes(keyword)) {
      matchedKeywords.push(keyword)
    }
  }

  // Determine severity based on specific phrases
  const highSeverityPhrases = [
    'kill myself',
    'end my life',
    'want to die',
    'suicide plan',
    'going to kill',
    'better off dead',
  ]

  const hasHighSeverityPhrase = highSeverityPhrases.some((phrase) =>
    lowerMessage.includes(phrase)
  )

  let severity: 'low' | 'medium' | 'high' = 'low'
  let isCrisis = false

  if (matchedKeywords.length > 0) {
    isCrisis = true

    if (hasHighSeverityPhrase || matchedKeywords.length >= 3) {
      severity = 'high'
    } else if (matchedKeywords.length >= 2) {
      severity = 'medium'
    } else {
      severity = 'low'
    }
  }

  return {
    isCrisis,
    severity,
    matchedKeywords,
  }
}

/**
 * Generate crisis response message
 */
export function getCrisisResponse(severity: 'low' | 'medium' | 'high'): string {
  const resources = `
🆘 REAL HELP NOW:

Immediate:
→ 911 if you're in danger

24/7 Crisis Lines:
→ Call/Text ${config.crisis.hotline}
→ Text HOME to ${config.crisis.textLine}

Also:
→ ER (nearest hospital)
→ Friend/family you trust
→ Your therapist if you have one`

  if (severity === 'high') {
    return `Stop. I need you to listen.

This is serious. You need trained professionals RIGHT NOW, not a text bot.

${resources}

I'll be here after you call them. But call them FIRST. Your safety matters. Go.`
  }

  if (severity === 'medium') {
    return `Hey. What you're telling me - this needs real help.

${resources}

These people are trained for this. I'm not. Please reach out. You don't have to handle this alone.`
  }

  // Low severity
  return `I'm seeing some heavy stuff here. Just want you to know help's available if you need it.

${resources}

No pressure. But they're there 24/7. You're worth it.`
}

/**
 * Log crisis detection for monitoring (implement your own logging)
 */
export function logCrisisDetection(
  userId: string,
  message: string,
  detection: CrisisDetectionResult
): void {
  const timestamp = new Date().toISOString()

  console.warn('🚨 CRISIS DETECTED 🚨')
  console.warn({
    timestamp,
    userId,
    severity: detection.severity,
    matchedKeywords: detection.matchedKeywords,
    messagePreview: message.substring(0, 100),
  })

  // TODO: Implement additional logging
  // - Send to monitoring service
  // - Alert human supervisor
  // - Store in database for review
}
