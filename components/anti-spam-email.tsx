"use client"

import { useState, useEffect } from "react"

interface AntiSpamEmailProps {
  email: string
  className?: string
  showCopyButton?: boolean
  copyMessage?: string
}

export default function AntiSpamEmail({ 
  email, 
  className = "", 
  showCopyButton = true,
  copyMessage = "Email copied to clipboard!"
}: AntiSpamEmailProps) {
  const [displayEmail, setDisplayEmail] = useState<string>("")
  const [isRevealed, setIsRevealed] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // Advanced anti-spam obfuscation
    const obfuscateEmail = () => {
      const [localPart, domain] = email.split('@')
      const [domainName, tld] = domain.split('.')
      
      // Create multiple obfuscation layers
      const obfuscated = [
        btoa(localPart).split('').reverse().join(''),
        '@',
        btoa(domainName).split('').reverse().join(''),
        '.',
        btoa(tld).split('').reverse().join('')
      ].join('')
      
      setDisplayEmail(obfuscated)
    }

    obfuscateEmail()
  }, [email])

  const revealEmail = () => {
    if (!isRevealed) {
      setDisplayEmail(email)
      setIsRevealed(true)
      
      // Auto-re-obfuscate after 5 seconds
      setTimeout(() => {
        setIsRevealed(false)
        const [localPart, domain] = email.split('@')
        const [domainName, tld] = domain.split('.')
        
        const obfuscated = [
          btoa(localPart).split('').reverse().join(''),
          '@',
          btoa(domainName).split('').reverse().join(''),
          '.',
          btoa(tld).split('').reverse().join('')
        ].join('')
        
        setDisplayEmail(obfuscated)
      }, 5000)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const tempInput = document.createElement('input')
      tempInput.value = email
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleClick = () => {
    if (!isRevealed) {
      revealEmail()
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="cursor-pointer select-none font-mono hover:text-blue-700 transition-colors"
        onClick={handleClick}
        onMouseEnter={revealEmail}
        title={isRevealed ? "Click to copy" : "Click to reveal email"}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      >
        {displayEmail}
      </span>
      
      {showCopyButton && isRevealed && (
        <button
          onClick={copyToClipboard}
          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          title="Copy email"
        >
          {copySuccess ? "✓ Copied!" : "Copy"}
        </button>
      )}
      
      {/* Hidden honeypot for bots */}
      <span 
        className="hidden" 
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        contact@example.com
      </span>
    </div>
  )
}
