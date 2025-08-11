This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Google Analytics Setup

This project includes Google Analytics 4 (GA4) integration using Next.js best practices.

### Setup Steps

1. **Get Your Google Analytics Measurement ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or select an existing one
   - Go to Admin → Data Streams → Web
   - Copy your Measurement ID (starts with "G-")

2. **Configure Environment Variables**:
   - Open `.env.local` file
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID:
     ```
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
     ```

3. **Restart Your Development Server**:
   ```bash
   npm run dev
   ```

### Usage

- **Automatic Page Views**: Page views are automatically tracked when users navigate between pages
- **Custom Events**: Use the `useAnalytics` hook to track custom events:

```tsx
import { useAnalytics } from '@/lib/use-analytics'

function MyComponent() {
  const { trackEvent } = useAnalytics()

  const handleButtonClick = () => {
    trackEvent('button_click', 'engagement', 'cta_button', 1)
  }

  return (
    <button onClick={handleButtonClick}>
      Click Me
    </button>
  )
}
```

### Event Parameters
- `action`: The action being tracked (e.g., 'button_click', 'form_submit')
- `category`: The category of the event (e.g., 'engagement', 'ecommerce')
- `label`: Optional label for additional context
- `value`: Optional numeric value

### Verification
1. Open your website in a browser
2. Open Developer Tools → Network tab
3. Look for requests to `google-analytics.com`
4. Check your Google Analytics Real-Time reports

### Privacy Considerations
- This implementation respects user privacy settings
- Consider adding a cookie consent banner for GDPR compliance
- The analytics component only loads when the measurement ID is provided

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
