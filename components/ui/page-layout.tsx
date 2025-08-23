"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen relative", className)}>
      <div className="max-w-[900px] mx-auto">
        {children}
      </div>
    </div>
  )
}

interface PageSectionProps {
  children: ReactNode
  className?: string
  background?: "default" | "white" | "muted" | "gradient"
}

export function FullScreenSection({ children, className, background = "default" }: PageSectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    white: "bg-white",
    muted: "bg-muted",
    gradient: "bg-gradient-to-br from-muted via-white to-blue-50/20"
  }

  return (
    <section className={cn(
      "relative w-full min-h-screen flex items-center justify-center py-20 sm:py-20 md:py-24 lg:py-32",
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  )
}
