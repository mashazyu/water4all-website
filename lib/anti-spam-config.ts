/**
 * Anti-Spam Configuration
 * Centralized configuration for email protection and spam prevention
 */

export const ANTI_SPAM_CONFIG = {
  // Email obfuscation settings
  email: {
    // Obfuscation methods
    obfuscationMethods: ['base64', 'reverse', 'split', 'unicode'] as const,
    
    // Auto-re-obfuscate delay (milliseconds)
    reobfuscateDelay: 5000,
    
    // Honeypot email addresses to catch bots
    honeypotEmails: [
      'contact@example.com',
      'info@example.com',
      'admin@example.com',
      'support@example.com'
    ],
    
    // CSS classes to hide honeypot elements
    honeypotClasses: ['hidden', 'sr-only', 'visually-hidden'],
    
    // User agent patterns that indicate bots
    botPatterns: [
      'bot',
      'crawler',
      'spider',
      'scraper',
      'scraping',
      'email',
      'harvester'
    ]
  },
  
  // Rate limiting for email reveals
  rateLimit: {
    maxRevealsPerMinute: 10,
    maxRevealsPerHour: 50,
    blockDuration: 300000 // 5 minutes in milliseconds
  },
  
  // CSS obfuscation techniques
  css: {
    // Use CSS to hide parts of email
    useTextDirection: true,
    useVisibility: true,
    useOpacity: true,
    useTransform: true
  }
} as const

/**
 * Check if user agent indicates a bot
 */
export function isBotUserAgent(userAgent: string): boolean {
  const lowerUA = userAgent.toLowerCase()
  return ANTI_SPAM_CONFIG.email.botPatterns.some(pattern => 
    lowerUA.includes(pattern)
  )
}

/**
 * Generate a honeypot email address
 */
export function generateHoneypotEmail(): string {
  const honeypots = ANTI_SPAM_CONFIG.email.honeypotEmails
  return honeypots[Math.floor(Math.random() * honeypots.length)]
}

/**
 * Apply CSS obfuscation to email elements
 */
export function getCSSObfuscationStyles(): React.CSSProperties {
  return {
    // Make text unselectable
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    
    // Use monospace font to prevent character recognition
    fontFamily: 'monospace',
    
    // Add subtle transformations
    transform: 'rotate(0.001deg)',
    
    // Prevent text highlighting
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent'
  }
}
