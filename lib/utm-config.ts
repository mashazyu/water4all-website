/**
 * UTM Parameter Configuration
 * Centralized constants and types for UTM tracking
 */

export const UTM_PARAMETERS = [
  'utm_source',
  'utm_medium', 
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const

export type UTMParameter = typeof UTM_PARAMETERS[number]

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export type UTMParamsWithValues = {
  [K in UTMParameter]?: string
}

/**
 * Extract UTM parameters from a URL string
 */
export function extractUTMParams(url: string): UTMParams {
  try {
    const urlObj = new URL(url)
    const params = new URLSearchParams(urlObj.search)
    
    const utmParams: UTMParams = {}
    
    UTM_PARAMETERS.forEach(key => {
      const value = params.get(key)
      if (value) {
        utmParams[key] = value
      }
    })
    
    return utmParams
  } catch (error) {
    console.warn('Failed to parse URL for UTM parameters:', error)
    return {}
  }
}

/**
 * Create a URL with UTM parameters
 */
export function createURLWithUTM(
  baseUrl: string,
  utmParams: UTMParams
): string {
  try {
    const url = new URL(baseUrl)
    const params = new URLSearchParams(url.search)
    
    UTM_PARAMETERS.forEach(key => {
      const value = utmParams[key]
      if (value) {
        params.set(key, value)
      }
    })
    
    url.search = params.toString()
    return url.toString()
  } catch (error) {
    console.warn('Failed to create URL with UTM parameters:', error)
    return baseUrl
  }
}

/**
 * Check if current URL has UTM parameters
 */
export function hasUTMParams(): boolean {
  if (typeof window === 'undefined') return false
  
  const params = new URLSearchParams(window.location.search)
  return UTM_PARAMETERS.some(key => params.has(key))
}

/**
 * Get current UTM parameters from browser
 */
export function getCurrentUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  
  return extractUTMParams(window.location.href)
}

/**
 * Generate test UTM parameters for testing
 */
export function generateTestUTMParams(): UTMParams {
  return {
    utm_source: 'test_source',
    utm_medium: 'test_medium',
    utm_campaign: 'test_campaign',
    utm_term: 'test_term',
    utm_content: 'test_content'
  }
}
