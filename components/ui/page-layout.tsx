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
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}

interface PageSectionProps {
  children: ReactNode
  className?: string
  background?: "default" | "white" | "muted" | "light" | "dark" | "primary" | "secondary"
}

export function FullScreenSection({ children, className, background = "default" }: PageSectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    white: "bg-white",
    muted: "bg-muted",
    light: "bg-background-light",
    dark: "bg-background-dark",
    primary: "bg-primary/5",
    secondary: "bg-secondary/10"
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
