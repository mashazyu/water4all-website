import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to split text into paragraphs
export function renderParagraphs(text: string, className: string = "text-gray-700 leading-relaxed text-sm"): React.JSX.Element[] {
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className={className}>
      {paragraph}
    </p>
  ))
}
