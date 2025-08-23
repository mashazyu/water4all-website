"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ButtonNew } from "@/components/ui/button-new"
import Link from "next/link"

interface InfoTileProps {
  icon: ReactNode
  title: string
  subtitle: string
  content?: ReactNode
  buttonText?: string
  buttonHref?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function InfoTile({
  icon,
  title,
  subtitle,
  content,
  buttonText,
  buttonHref,
  buttonVariant = "outline",
  className = ""
}: InfoTileProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden bg-white border border-border rounded-lg transition-all duration-300",
      className
    )}>
      <div className="p-6 sm:p-8 flex flex-col h-full">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed min-h-[3rem]">
              {subtitle}
            </p>
          </div>
        </div>
        
        {content && (
          <div className="flex-1">
            {content}
          </div>
        )}
        
        {buttonText && buttonHref && (
          <Link href={buttonHref}>
            <ButtonNew variant="action" className="w-full">
              {buttonText}
            </ButtonNew>
          </Link>
        )}
      </div>
    </div>
  )
}
