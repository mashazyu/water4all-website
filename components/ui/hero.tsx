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
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

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
        "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex items-center justify-center overflow-hidden cursor-pointer",
        background,
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with parallax effect */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000 transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-2000 transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        />
        
        {/* Interactive grid pattern */}
        <div 
          className="absolute inset-0 opacity-5 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: `scale(${isHovered ? 1.1 : 1})`
          }}
        />

        {/* Glowing accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-8 lg:px-12">
        {displayTitle && (
          <h1 
            className="text-5xl md:text-7xl font-black mb-8 md:mb-16 lg:mb-20 text-white tracking-tight leading-none transition-all duration-1000 ease-in-out cursor-pointer group"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
            }}
          >
            <span 
              className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent transition-all duration-500 group-hover:from-purple-100 group-hover:via-blue-100 group-hover:to-white"
              style={{
                textShadow: isHovered ? '0 0 30px rgba(255,255,255,0.3)' : 'none'
              }}
            >
              {displayTitle}
            </span>
          </h1>
        )}
        {displaySubtitle && (
          <p 
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8 transition-all duration-1000 ease-in-out cursor-pointer group"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`
            }}
          >
            <span className="group-hover:text-white/90 transition-colors duration-300">
              {displaySubtitle}
            </span>
          </p>
        )}
        
        {/* Enhanced text rotation indicator dots */}
        {animated && heroTexts && heroTexts.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {heroTexts.map((_: HeroText, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentTextIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentTextIndex 
                    ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                    : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                }`}
                aria-label={`Go to hero text ${index + 1}`}
              >
                {index === currentTextIndex && (
                  <div className="absolute inset-0 bg-white rounded-full animate-ping" />
                )}
              </button>
            ))}
          </div>
        )}
        

        
        {children}
      </div>
    </section>
  )
}
