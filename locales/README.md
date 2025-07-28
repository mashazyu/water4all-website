# Language Files

This directory contains translation files for the Water4All website.

## Available Languages

- `en.json` - English translations
- `de.json` - German translations  
- `ru.json` - Russian translations

## Structure

Each language file follows the same structure with the following sections:

### Navigation
- `home` - Home page link
- `subproject1` - Water Sources Map link
- `subproject2` - Drinking Fountains Installation link
- `about` - About page link
- `faq` - FAQ page link
- `switchLanguage` - Language switcher text

### Footer
- `contact` - Contact link
- `email` - Email label
- `privacy` - Privacy Policy link

### Home Page
- `projectTitle` - Main project title
- `projectIntro` - Project introduction
- `subproject1Title` - First subproject title
- `subproject1Description` - First subproject description
- `subproject2Title` - Second subproject title
- `subproject2Description` - Second subproject description
- `learnMore` - Learn more button text
- `latestNews` - Latest news section title

### Subprojects
- `subproject1FullDescription` - Detailed description of water sources map
- `subproject1Details` - Additional details about the map project
- `subproject2FullDescription` - Detailed description of fountain installation
- `subproject2Details` - Additional details about the installation project
- `relatedNews` - Related news section title

### About Page
- `title` - About page title
- `intro` - About page introduction

### Privacy Page
- `title` - Privacy page title
- `intro` - Privacy policy introduction
- `responsibleParty` - Responsible party section title
- `responsiblePartyContent` - Responsible party contact information
- `dataProcessed` - Data processed section title
- `dataProcessedContent` - Description of data processing
- `analyticsService` - Analytics service section title
- `analyticsServiceContent` - Vercel analytics service description with link
- `purposeOfProcessing` - Purpose of processing section title
- `purposeOfProcessingContent` - List of processing purposes
- `cookies` - Cookies section title
- `cookiesContent` - Cookie usage description
- `yourRights` - Your rights section title
- `yourRightsIntro` - Rights introduction text
- `yourRightsList` - List of GDPR rights
- `contactInfo` - Contact information for privacy inquiries

### FAQ Page
- `title` - FAQ page title
- `intro` - FAQ page introduction
- `questions` - FAQ questions and answers:
  - `faq1Question` / `faq1Answer` - How to find drinking fountains
  - `faq2Question` / `faq2Answer` - Safety of drinking fountains
  - `faq5Question` / `faq5Answer` - How to support the initiative
  - `faq6Question` / `faq6Answer` - Why focus on Pankow district

### News
Array of news items, each containing:
- `id` - Unique identifier (number)
- `title` - News title
- `content` - News content
- `date` - Date in YYYY-MM format
- `project` - Array of project IDs this news relates to

## News Project Tags

- `[1]` - Water Sources Map project
- `[2]` - Drinking Fountains Installation project
- `[1, 2]` - Both projects

## Date Format

All news dates use the format `YYYY-MM` (e.g., "2025-07") and are displayed as month and year only in the interface.

## Privacy Policy Links

The privacy policy includes a link to Vercel's privacy policy using markdown format: `[Privacy Policy](https://vercel.com/legal/privacy-policy)`. This link is automatically rendered as a clickable link in the privacy page. 