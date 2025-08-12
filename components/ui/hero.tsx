import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  background?: string
  showDivider?: boolean
}

export function Hero({ 
  title, 
  subtitle, 
  children, 
  className = "",
  background = "bg-primary",
  showDivider = true
}: HeroProps) {
  return (
    <section className={cn(
      "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[60vh] flex items-center justify-center",
      background,
      className
    )}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight leading-none">
          {title}
        </h1>
        {showDivider && (
          <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
