import { ReactNode, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface HeroText {
  title: string
  subtitle: string
}

interface HeroProps {
  title?: string
  subtitle?: string
  heroTexts?: HeroText[]
  children?: ReactNode
  className?: string
  background?: string
  showDivider?: boolean
  animated?: boolean
  style?: React.CSSProperties
}

export function Hero({ 
  title, 
  subtitle, 
  heroTexts,
  children, 
  className = "",
  background = "bg-primary",
  showDivider = false,
  animated = false,
  style
}: HeroProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Auto-rotate hero texts every 4 seconds if animated
  useEffect(() => {
    if (!animated || !heroTexts || heroTexts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === heroTexts.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [animated, heroTexts])

  // Determine which text to display
  const displayTitle = animated && heroTexts && heroTexts.length > 0 
    ? heroTexts[currentTextIndex]?.title 
    : title
  const displaySubtitle = animated && heroTexts && heroTexts.length > 0 
    ? heroTexts[currentTextIndex]?.subtitle 
    : subtitle
      return (
      <section 
        className={cn(
          "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[60vh] flex items-center justify-center",
          background,
          className
        )}
        style={style}
      >
      <div className="max-w-2xl mx-auto text-center px-6 md:px-8 lg:px-12">
        {displayTitle && (
          <h1 className="text-5xl md:text-7xl font-black mb-8 md:mb-16 lg:mb-20 text-white tracking-tight leading-none transition-all duration-1000 ease-in-out">
            {displayTitle}
          </h1>
        )}
        {displaySubtitle && (
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8 transition-all duration-1000 ease-in-out">
            {displaySubtitle}
          </p>
        )}
        
        {/* Text rotation indicator dots */}
        {animated && heroTexts && heroTexts.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {heroTexts.map((_: HeroText, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentTextIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTextIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to hero text ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {children}
      </div>
    </section>
  )
}
