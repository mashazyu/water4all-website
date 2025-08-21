"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right" | "scale-in"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({ 
  children, 
  className, 
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        !isVisible && "opacity-0",
        isVisible && `animate-${animation}`,
        className
      )}
      style={{
        transform: !isVisible ? 
          (animation === "fade-in-up" ? "translateY(30px)" :
           animation === "fade-in-down" ? "translateY(-30px)" :
           animation === "fade-in-left" ? "translateX(-30px)" :
           animation === "fade-in-right" ? "translateX(30px)" :
           animation === "scale-in" ? "scale(0.9)" : "translateY(30px)") : 
          "translateY(0) scale(1)"
      }}
    >
      {children}
    </div>
  )
}
