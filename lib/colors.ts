/**
 * Color Palette Configuration
 * Centralized color definitions for consistent theming
 */

export const colors = {
  // Primary Colors
  primary: '#1800ad',
  secondary: '#9a89b4',
  
  // Background Colors
  background: '#fcf8ff',
  backgroundLight: '#ffffff',
  backgroundDark: '#f0e8ff',
  
  // Text Colors
  text: '#1e1926',
  textLight: '#4a4458',
  textMuted: '#6b5f7a',
  
  // UI Colors
  border: '#e0d8f0',
  borderLight: '#f0e8ff',
  borderDark: '#9a89b4',
  
  // Interactive Colors
  hover: '#9a89b4',
  active: '#1800ad',
  focus: '#1800ad',
  
  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const

export type ColorKey = keyof typeof colors

// CSS Custom Properties for Tailwind
export const cssCustomProperties = {
  '--background': colors.background,
  '--foreground': colors.text,
  '--card': colors.backgroundLight,
  '--card-foreground': colors.text,
  '--popover': colors.backgroundLight,
  '--popover-foreground': colors.text,
  '--primary': colors.primary,
  '--primary-foreground': colors.background,
  '--secondary': colors.secondary,
  '--secondary-foreground': colors.text,
  '--muted': colors.backgroundDark,
  '--muted-foreground': colors.textMuted,
  '--accent': colors.borderLight,
  '--accent-foreground': colors.text,
  '--destructive': colors.error,
  '--destructive-foreground': colors.background,
  '--border': colors.border,
  '--input': colors.border,
  '--ring': colors.primary,
} as const

// Tailwind color classes mapping
export const tailwindColors = {
  'bg-primary': `bg-[${colors.primary}]`,
  'bg-secondary': `bg-[${colors.secondary}]`,
  'bg-background': `bg-[${colors.background}]`,
  'bg-background-light': `bg-[${colors.backgroundLight}]`,
  'bg-background-dark': `bg-[${colors.backgroundDark}]`,
  
  'text-primary': `text-[${colors.primary}]`,
  'text-secondary': `text-[${colors.secondary}]`,
  'text-foreground': `text-[${colors.text}]`,
  'text-light': `text-[${colors.textLight}]`,
  'text-muted': `text-[${colors.textMuted}]`,
  
  'border-primary': `border-[${colors.primary}]`,
  'border-secondary': `border-[${colors.secondary}]`,
  'border-border': `border-[${colors.border}]`,
  'border-light': `border-[${colors.borderLight}]`,
  'border-dark': `border-[${colors.borderDark}]`,
  
  'hover:bg-primary': `hover:bg-[${colors.primary}]`,
  'hover:bg-secondary': `hover:bg-[${colors.secondary}]`,
  'hover:text-primary': `hover:text-[${colors.primary}]`,
  'hover:text-secondary': `hover:text-[${colors.secondary}]`,
  'hover:border-primary': `hover:border-[${colors.primary}]`,
  'hover:border-secondary': `hover:border-[${colors.secondary}]`,
} as const
