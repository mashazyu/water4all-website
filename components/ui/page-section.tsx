import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: ReactNode
  className?: string
  title?: string
  showAccentLine?: boolean
  accentLineHeight?: string
  titleSize?: "sm" | "md" | "lg" | "xl"
  background?: "default" | "white" | "muted" | "gradient"
  fullHeight?: boolean
}

export function PageSection({ 
  children, 
  className,
  title,
  showAccentLine = true,
  accentLineHeight = "h-6",
  titleSize = "lg",
  background = "default",
  fullHeight = true
}: PageSectionProps) {
  const backgroundClasses = {
    default: "bg-gradient-to-br from-muted via-white to-blue-50/20",
    white: "bg-white",
    muted: "bg-muted",
    gradient: "bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20"
  }

  const titleSizeClasses = {
    sm: "text-xl font-semibold",
    md: "text-2xl font-semibold", 
    lg: "text-3xl md:text-4xl font-bold",
    xl: "text-4xl md:text-5xl font-bold"
  }

  return (
    <section className={cn(
      "relative w-full flex items-center justify-center",
      fullHeight && "min-h-screen",
      backgroundClasses[background],
      className
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full py-20 sm:py-20 md:py-24 lg:py-32">
        {title && (
          <div className="mb-8 sm:mb-12">
            <div className="border-b border-border pb-2 group cursor-pointer">
              <h1 className={cn(
                "text-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2",
                titleSizeClasses[titleSize]
              )}>
                {showAccentLine && (
                  <span className={cn(
                    "w-1 bg-primary rounded-full group-hover:h-8 transition-all duration-300",
                    accentLineHeight
                  )} />
                )}
                {title}
              </h1>
            </div>
          </div>
        )}
        <div className="space-y-4 sm:space-y-6">
          {children}
        </div>
      </div>
    </section>
  )
}

interface PageSectionCenteredProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  fullWidth?: boolean
}

export function PageSectionCentered({ 
  children, 
  className = "", 
  containerClassName = "",
  fullWidth = false 
}: PageSectionCenteredProps) {
  return (
    <section className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        fullWidth ? "w-full" : "max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center",
        "py-20 sm:py-20 md:py-24",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
