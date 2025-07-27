# Language Files

This directory contains all the text content for the website in different languages.

## Structure

Each language has its own JSON file:
- `en.json` - English translations
- `de.json` - German translations

## File Structure

Each language file follows the same structure with the following sections:

### Navigation
- `home` - Home page link
- `subproject1` - Water Sources Map link
- `subproject2` - Drinking Fountains link
- `about` - About page link
- `faq` - FAQ page link
- `switchLanguage` - Language switcher text

### Footer
- `contact` - Contact section title
- `email` - Email label
- `privacy` - Privacy Policy link

### Home Page
- `projectTitle` - Main project title
- `projectIntro` - Project introduction text
- `subproject1Title` - First subproject title
- `subproject1Description` - First subproject description
- `subproject2Title` - Second subproject title
- `subproject2Description` - Second subproject description
- `learnMore` - Learn more button text
- `latestNews` - Latest news section title

### Subprojects
- `subproject1FullDescription` - Full description for subproject 1
- `subproject1Details` - Detailed information for subproject 1
- `subproject2FullDescription` - Full description for subproject 2
- `subproject2Details` - Detailed information for subproject 2
- `relatedNews` - Related news section title

### About Page
- `title` - About page title
- `intro` - About page introduction

### Privacy Page
- `title` - Privacy page title

### FAQ Page
- `title` - FAQ page title
- `intro` - FAQ page introduction
- `questions` - Object containing all FAQ questions and answers

### News
- `newsTitle1` through `newsTitle6` - News article titles
- `newsContent1` through `newsContent6` - News article content

## Adding New Languages

To add a new language:

1. Create a new JSON file (e.g., `fr.json` for French)
2. Copy the structure from an existing language file
3. Translate all the values to the target language
4. Update the language provider to include the new language

## Usage

These files are used by the `LanguageProvider` component to provide translations throughout the website. The current implementation loads these translations dynamically based on the user's language selection. 