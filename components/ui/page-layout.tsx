"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen md:h-screen overflow-y-scroll scroll-smooth relative", className)}>
      <div className="md:snap-y md:snap-mandatory">
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
      "md:snap-start relative w-full md:w-screen md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw] min-h-screen md:min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24",
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  )
}
