"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface SupporterOrganization {
  title: string
  website: string | null
  image: string | null
}

interface OrgTileProps {
  organization: SupporterOrganization
  className?: string
}

export function OrgTile({ organization, className = "" }: OrgTileProps) {
  const { title, website, image } = organization

  const content = (
    <Card className={`border border-border shadow-none hover:shadow-none transition-none max-w-56 h-full ${className}`}>
      <CardContent className="p-4 flex flex-col items-center h-full">
        {image ? (
          <div className="w-48 h-24 relative mb-2">
            <Image
              src={image}
              alt={`${title}`}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-2">
            <span className="text-red-600 font-bold text-2xl">
              {title.split(' ').map(word => word[0]).join('')}
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        
        {website ? (
          <div className="flex items-center text-primary text-sm font-medium">
            Visit Website <ExternalLink className="w-3 h-3 ml-1" />
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">
            Political Support
          </span>
        )}
      </CardContent>
    </Card>
  )

  if (website) {
    return (
      <Link 
        href={website} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    )
  }

  return content
}
