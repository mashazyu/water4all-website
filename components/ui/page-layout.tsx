"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("h-screen overflow-y-scroll scroll-smooth relative", className)}>
      <div className="snap-y snap-mandatory">
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
      "snap-start relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen flex items-center justify-center py-8 md:py-12 lg:py-16",
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  )
}
