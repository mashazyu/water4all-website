/**
 * Application Constants
 * Centralized constants for consistent use across the application
 */

export const MAP_URLS = {
  // Google Maps URLs for different languages
  ENGLISH_MAP: "https://www.google.com/maps/d/edit?mid=1Vu1ecwzIo0W7WEs8MIbz49hOJZSgoZY&usp=sharing",
  GERMAN_MAP: "https://www.google.com/maps/d/edit?mid=1HgO_tGN1FNRSBLsdvsE3haOEX0D15us&usp=sharing",
  // Embed URLs for iframe display
  ENGLISH_MAP_EMBED: "https://www.google.com/maps/d/embed?mid=1Vu1ecwzIo0W7WEs8MIbz49hOJZSgoZY&ehbc=2E312F",
  GERMAN_MAP_EMBED: "https://www.google.com/maps/d/embed?mid=1HgO_tGN1FNRSBLsdvsE3haOEX0D15us&ehbc=2E312F"
} as const

export type MapUrlKey = keyof typeof MAP_URLS

/**
 * Get the appropriate map embed URL based on user language
 * English and Russian users get English map, German users get German map
 */
export const getMapEmbedUrl = (language: string): string => {
  switch (language) {
    case 'de':
      return MAP_URLS.GERMAN_MAP_EMBED
    case 'en':
    case 'ru':
    default:
      return MAP_URLS.ENGLISH_MAP_EMBED
  }
}
