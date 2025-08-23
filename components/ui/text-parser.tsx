"use client"

import { ReactNode } from "react"

interface TextParserProps {
  text: string
  className?: string
}

export function TextParser({ text, className = "" }: TextParserProps) {
  // Function to render markdown-like links and handle new paragraphs
  const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = text.split(linkRegex)
    
    if (parts.length === 1) {
      return <span>{text}</span>
    }
    
    const elements = []
    for (let i = 0; i < parts.length; i += 3) {
      if (parts[i]) elements.push(<span key={`text-${i}`}>{parts[i]}</span>)
      if (parts[i + 1] && parts[i + 2]) {
        elements.push(
          <a 
            key={`link-${i}`} 
            href={parts[i + 2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary underline"
          >
            {parts[i + 1]}
          </a>
        )
      }
    }
    return <>{elements}</>
  }

  // Split text by double newlines to create paragraphs
  const paragraphs = text.split(/\n\n+/)

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {renderTextWithLinks(paragraph.trim())}
        </p>
      ))}
    </div>
  )
}
