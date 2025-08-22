import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: ReactNode
  className?: string
  title?: string
  showAccentLine?: boolean
  accentLineHeight?: string
  titleSize?: "sm" | "md" | "lg" | "xl"
  background?: "default" | "white" | "muted"
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
    muted: "bg-muted"
  }

  const titleSizeClasses = {
    sm: "text-xl font-semibold",
    md: "text-2xl font-semibold", 
    lg: "text-3xl md:text-4xl font-bold",
    xl: "text-4xl md:text-5xl font-bold"
  }

  return (
    <section className={cn(
      "relative w-full md:w-screen md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw] flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24",
      fullHeight && "min-h-screen",
      backgroundClasses[background],
      className
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
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
    <section className={cn("py-8 sm:py-12 md:py-16 flex items-center justify-center", className)}>
      <div className={cn(
        fullWidth ? "w-full" : "max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center",
        containerClassName
      )}>
        {children}
      </div>
    </section>
  )
}
