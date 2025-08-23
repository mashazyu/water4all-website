"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"

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
  const { translations } = useLanguage()
  const [displayEmail, setDisplayEmail] = useState<string>("")
  const [isRevealed, setIsRevealed] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // Show translated hover message instead of obfuscated email
    setDisplayEmail(translations?.antispam?.hoverToSeeEmail || "Please hover over to see email")
  }, [email, translations])

  const revealEmail = () => {
    if (!isRevealed) {
      setDisplayEmail(email)
      setIsRevealed(true)
      
      // Auto-re-hide after 5 seconds
      setTimeout(() => {
        setIsRevealed(false)
        setDisplayEmail(translations?.antispam?.hoverToSeeEmail || "Please hover over to see email")
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
        className="cursor-pointer select-none font-mono text-xs sm:text-sm hover:text-primary transition-colors break-all"
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
          className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors flex-shrink-0"
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
