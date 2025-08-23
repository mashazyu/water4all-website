"use client"

import { ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonNewProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "action" | "regular"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ButtonNew({
  children,
  variant = "regular",
  size = "md",
  className = "",
  ...props
}: ButtonNewProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
  
  const variantClasses = {
    action: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    regular: "bg-muted text-muted-foreground hover:bg-muted/80 focus:ring-muted"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
