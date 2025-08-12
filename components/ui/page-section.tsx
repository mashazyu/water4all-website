import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  fullWidth?: boolean
}

export function PageSection({ 
  children, 
  className = "", 
  containerClassName = "",
  fullWidth = false 
}: PageSectionProps) {
  return (
    <section className={cn("py-16", className)}>
      <div className={cn(
        fullWidth ? "w-full" : "max-w-4xl mx-auto px-4",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}

export function PageSectionCentered({ 
  children, 
  className = "", 
  containerClassName = "",
  fullWidth = false 
}: PageSectionProps) {
  return (
    <section className={cn("py-16 flex items-center justify-center", className)}>
      <div className={cn(
        fullWidth ? "w-full" : "max-w-4xl mx-auto px-4 text-center",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
