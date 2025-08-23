/**
 * Application Constants
 * Centralized constants for consistent use across the application
 */

export const MAP_URLS = {
  // Google Maps URLs for different languages
  ENGLISH_MAP: "https://www.google.com/maps/d/edit?mid=1Vu1ecwzIo0W7WEs8MIbz49hOJZSgoZY&usp=sharing",
  GERMAN_MAP: "https://www.google.com/maps/d/edit?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&usp=sharing"
} as const

export type MapUrlKey = keyof typeof MAP_URLS
