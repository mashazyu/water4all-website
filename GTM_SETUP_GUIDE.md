# Google Tag Manager UTM Parameter Setup Guide

## Overview
This guide follows Google's official documentation to properly configure GTM for UTM parameter tracking.

## Step 1: GTM Container Configuration

### 1.1 Variables Setup
Create these variables in your GTM container:

#### UTM Source Variable
- **Name**: `UTM Source`
- **Type**: URL
- **Component Type**: Query
- **Query Parameter**: `utm_source`

#### UTM Medium Variable
- **Name**: `UTM Medium`
- **Type**: URL
- **Component Type**: Query
- **Query Parameter**: `utm_medium`

#### UTM Campaign Variable
- **Name**: `UTM Campaign`
- **Type**: URL
- **Component Type**: Query
- **Query Parameter**: `utm_campaign`

#### UTM Term Variable
- **Name**: `UTM Term`
- **Type**: URL
- **Component Type**: Query
- **Query Parameter**: `utm_term`

#### UTM Content Variable
- **Name**: `UTM Content`
- **Type**: URL
- **Component Type**: Query
- **Query Parameter**: `utm_content`

### 1.2 Custom JavaScript Variable for UTM Persistence
Create a custom JavaScript variable:

**Name**: `UTM Parameters`
**Type**: Custom JavaScript

```javascript
function() {
  var utmParams = {};
  var urlParams = new URLSearchParams(window.location.search);
  
  // Get UTM parameters from URL
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  utmKeys.forEach(function(key) {
    var value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  // If no UTM parameters in URL, check localStorage
  if (Object.keys(utmParams).length === 0) {
    var stored = localStorage.getItem('utm_params');
    if (stored) {
      try {
        utmParams = JSON.parse(stored);
      } catch (e) {
        utmParams = {};
      }
    }
  }
  
  return utmParams;
}
```

## Step 2: Triggers Setup

### 2.1 UTM Parameters Received Trigger
- **Name**: `UTM Parameters Received`
- **Type**: Custom Event
- **Event Name**: `custom_utm_tracking`
- **Fire on**: All Custom Events

### 2.2 Page View with UTM Trigger
- **Name**: `Page View with UTM`
- **Type**: Custom Event
- **Event Name**: `page_view`
- **Fire on**: All Custom Events

## Step 3: Tags Setup

### 3.1 Google Analytics 4 Configuration Tag
- **Name**: `GA4 - UTM Tracking`
- **Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: Your GA4 measurement ID
- **Trigger**: `UTM Parameters Received`
- **Configuration**:
  - **User Properties**:
    - `utm_source` → `{{UTM Source}}`
    - `utm_medium` → `{{UTM Medium}}`
    - `utm_campaign` → `{{UTM Campaign}}`
    - `utm_term` → `{{UTM Term}}`
    - `utm_content` → `{{UTM Content}}`

### 3.2 Custom Event Tag for UTM
- **Name**: `Custom UTM Event`
- **Type**: Google Analytics: GA4 Event
- **Configuration**:
  - **Event Name**: `utm_parameters_received`
  - **Event Parameters**:
    - `utm_source` → `{{UTM Source}}`
    - `utm_medium` → `{{UTM Medium}}`
    - `utm_campaign` → `{{UTM Campaign}}`
    - `utm_term` → `{{UTM Term}}`
    - `utm_content` → `{{UTM Content}}`
    - `page_location` → `{{Page URL}}`
    - `page_title` → `{{Page Title}}`
- **Trigger**: `UTM Parameters Received`

### 3.3 Page View Tag with UTM
- **Name**: `Page View with UTM`
- **Type**: Google Analytics: GA4 Event
- **Configuration**:
  - **Event Name**: `page_view`
  - **Event Parameters**:
    - `page_location` → `{{Page URL}}`
    - `page_title` → `{{Page Title}}`
    - `page_referrer` → `{{Referrer}}`
    - `utm_source` → `{{UTM Source}}`
    - `utm_medium` → `{{UTM Medium}}`
    - `utm_campaign` → `{{UTM Campaign}}`
    - `utm_term` → `{{UTM Term}}`
    - `utm_content` → `{{UTM Content}}`
- **Trigger**: `Page View with UTM`

## Step 4: Data Layer Testing

### 4.1 Preview Mode
1. Enable GTM Preview mode
2. Navigate to: `https://www.water4all.com.de/en/map?utm_source=test`
3. Check that these events fire:
   - `custom_utm_tracking`
   - `page_view`
   - `set_user_properties`

### 4.2 Console Verification
You should see these logs in the browser console:
```
🔍 UTM Parameters found in URL: {utm_source: 'test'}
📊 Sending UTM parameters to Google Tag Manager: {utm_source: 'test'}
✅ UTM parameters sent to GTM via multiple methods following Google documentation
```

## Step 5: Google Analytics 4 Verification

### 5.1 Real-time Reports
- Go to GA4 → Reports → Real-time
- Look for events: `utm_parameters_received` and `page_view`
- Check that UTM parameters appear in event details

### 5.2 User Properties
- Go to GA4 → Configure → Custom Definitions
- Create custom user properties for UTM parameters
- Verify data is being collected

## Troubleshooting

### Common Issues:
1. **GTM not loading**: Check GTM container ID
2. **Events not firing**: Verify triggers and tags are properly configured
3. **UTM parameters missing**: Check variable configuration
4. **Data not appearing in GA4**: Verify GA4 configuration tag

### Debug Steps:
1. Check GTM Preview mode
2. Verify dataLayer in browser console
3. Check GA4 real-time reports
4. Verify UTM parameters in GTM variables

## Important Notes:
- UTM parameters are automatically captured by GA4 when passed via dataLayer
- The `page_view` event with UTM parameters is the most reliable method
- User properties ensure UTM data persists across sessions
- Custom events provide additional tracking flexibility

Follow this guide exactly as outlined to ensure proper UTM parameter tracking in Google Tag Manager.
