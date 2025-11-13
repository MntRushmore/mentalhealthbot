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
🆘 **CRISIS RESOURCES**

If you're in immediate danger:
• Call 911

24/7 Crisis Support:
• Call/Text ${config.crisis.hotline} (Suicide & Crisis Lifeline)
• Text HOME to ${config.crisis.textLine} (Crisis Text Line)
• Call 1-800-273-8255 (National Suicide Prevention Lifeline)

International:
• Visit findahelpline.com for your country

You can also:
• Go to your nearest emergency room
• Call a trusted friend or family member
• Contact your therapist if you have one`

  if (severity === 'high') {
    return `I'm really concerned about your safety right now. What you're feeling is serious, and you deserve immediate support from trained crisis professionals.

${resources}

Please reach out to one of these resources right away. You don't have to go through this alone. 💙`
  }

  if (severity === 'medium') {
    return `I'm hearing that you're in a really difficult place. I want you to know that help is available, and things can get better.

${resources}

Please consider reaching out to one of these resources. They're staffed by trained professionals who can provide the support you need right now. 💙`
  }

  // Low severity
  return `I hear that you're struggling, and I want to make sure you have access to support if you need it.

${resources}

These resources are available 24/7 if you need someone to talk to. You deserve support. 💙`
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
