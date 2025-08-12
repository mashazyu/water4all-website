declare global {
  interface Window {
    dataLayer: any[]
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any> | string
    ) => void
  }
}

export {}
