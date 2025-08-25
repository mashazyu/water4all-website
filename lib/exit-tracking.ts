/**
 * Exit Link Tracking Utilities
 * Provides consistent tracking for users navigating away from the website
 */

export interface ExitLinkData {
  destination: string
  linkType: string
  userLanguage: string
  buttonLocation?: string
  buttonVariant?: string
  userPreferredLanguage?: string
  pageContext?: string
  additionalContext?: Record<string, any>
}

export interface ExitTrackingConfig {
  delayBeforeNavigation?: number
  trackToGTM?: boolean
  trackToGA?: boolean
}

/**
 * Default configuration for exit tracking
 */
export const DEFAULT_EXIT_TRACKING_CONFIG: ExitTrackingConfig = {
  delayBeforeNavigation: 100, // milliseconds
  trackToGTM: true,
  trackToGA: true,
}

/**
 * Enhanced exit link tracking function
 * Tracks user navigation to external links with comprehensive data
 */
export const trackExitLinkEnhanced = (
  data: ExitLinkData,
  config: ExitTrackingConfig = DEFAULT_EXIT_TRACKING_CONFIG
): void => {
  if (typeof window === 'undefined') return

  const {
    destination,
    linkType,
    userLanguage,
    buttonLocation,
    buttonVariant,
    userPreferredLanguage,
    pageContext,
    additionalContext
  } = data

  const timestamp = Date.now()
  const currentUrl = window.location.href
  const pageTitle = document.title

  // Prepare tracking payload
  const trackingPayload = {
    // Core exit data
    exit_link_type: linkType,
    exit_destination: destination,
    user_language: userLanguage,
    
    // Page context
    page_location: currentUrl,
    page_title: pageTitle,
    page_context: pageContext,
    
    // Button context
    button_location: buttonLocation,
    button_variant: buttonVariant,
    user_preferred_language: userPreferredLanguage,
    
    // Timing
    timestamp: timestamp,
    
    // Additional context
    ...additionalContext,
  }

  // Track to GTM dataLayer
  if (config.trackToGTM && window.dataLayer) {
    window.dataLayer.push({
      event: 'exit_link_click',
      ...trackingPayload,
    })
  }

  // Track to Google Analytics via gtag
  if (config.trackToGA && window.gtag) {
    window.gtag('event', 'exit_link', {
      event_category: 'navigation',
      event_label: `${linkType}_${userLanguage}`,
      destination: destination,
      link_type: linkType,
      user_language: userLanguage,
      page_location: currentUrl,
      page_title: pageTitle,
      timestamp: timestamp,
      button_location: buttonLocation,
      button_variant: buttonVariant,
      user_preferred_language: userPreferredLanguage,
      page_context: pageContext,
      ...additionalContext,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Exit link tracked:', {
      event: 'exit_link_click',
      ...trackingPayload,
    })
  }
}

/**
 * Convenience function for tracking map exits
 */
export const trackMapExit = (
  mapType: 'english' | 'german',
  userLanguage: string,
  additionalContext?: Record<string, any>
): void => {
  const mapUrls = {
    english: 'https://www.google.com/maps/d/edit?mid=1Vu1ecwzIo0W7WEs8MIbz49hOJZSgoZY&usp=sharing',
    german: 'https://www.google.com/maps/d/edit?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&usp=sharing'
  }

  trackExitLinkEnhanced({
    destination: mapUrls[mapType],
    linkType: `google_maps_${mapType}`,
    userLanguage: userLanguage,
    buttonLocation: 'map_page',
    pageContext: 'water_sources_map',
    additionalContext: {
      map_type: mapType,
      ...additionalContext,
    }
  })
}

/**
 * Generic external link tracking
 */
export const trackExternalLink = (
  url: string,
  linkType: string,
  userLanguage: string,
  additionalContext?: Record<string, any>
): void => {
  trackExitLinkEnhanced({
    destination: url,
    linkType: linkType,
    userLanguage: userLanguage,
    additionalContext: {
      link_category: 'external',
      ...additionalContext,
    }
  })
}
