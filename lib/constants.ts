/**
 * Application Constants
 * Centralized constants for consistent use across the application
 */

export const MAP_URLS = {
  // Google Maps URLs for different languages
  ENGLISH_MAP: "https://www.google.com/maps/d/embed?mid=1Vu1ecwzIo0W7WEs8MIbz49hOJZSgoZY&ehbc=2E312F&ll=52.498755205350385%2C13.43195174999999&z=11",
  GERMAN_MAP: "https://www.google.com/maps/d/edit?mid=1v5s3GJCaaJwk2WRFqHz3XiBXYEIuw1Y&ll=52.547946672443935%2C13.452717799999995&z=17"
} as const

export type MapUrlKey = keyof typeof MAP_URLS
