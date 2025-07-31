# ToolBank Analytics Setup Guide

Complete guide for setting up Google Analytics 4, Google Tag Manager, and Google Search Console for ToolBank.

## 📊 Google Analytics 4 (GA4) Setup

### 1. Create GA4 Property

#### **Step-by-Step Setup**
1. **Go to Google Analytics**: [analytics.google.com](https://analytics.google.com)
2. **Create Account**:
   - Account Name: "ToolBank"
   - Data Sharing Settings: Enable all recommended
3. **Create Property**:
   - Property Name: "ToolBank Website"
   - Reporting Time Zone: Your timezone
   - Currency: USD
4. **Business Information**:
   - Industry: "Technology"
   - Business Size: "Small"
   - Intended Use: "Get baseline reports"

#### **Data Stream Configuration**
1. **Choose Platform**: Web
2. **Website Details**:
   - Website URL: `https://toolbank.netlify.app`
   - Stream Name: "ToolBank Main Site"
3. **Enhanced Measurement**: Enable all options
4. **Copy Measurement ID**: `G-XXXXXXXXXX`

### 2. Enhanced Measurement Setup

#### **Enable Enhanced Measurement**
- ✅ Page views
- ✅ Scrolls (90% scroll depth)
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

#### **Custom Events Configuration**
Create these custom events in GA4:

```javascript
// Tool Usage Event
gtag('event', 'tool_usage', {
  'tool_name': 'BMI Calculator',
  'tool_category': 'Health & Fitness',
  'user_type': 'new_user'
});

// Tool Completion Event
gtag('event', 'tool_completion', {
  'tool_name': 'BMI Calculator',
  'tool_category': 'Health & Fitness',
  'time_spent': 120,
  'value': 5
});

// Download Event
gtag('event', 'file_download', {
  'file_name': 'invoice.pdf',
  'file_type': 'pdf',
  'tool_name': 'Invoice Generator'
});
```

### 3. Custom Dimensions & Metrics

#### **Custom Dimensions (Event-scoped)**
1. **tool_category**: Health & Fitness, Finance, etc.
2. **tool_difficulty**: beginner, intermediate, advanced
3. **user_type**: new_user, returning_user
4. **device_type**: mobile, desktop, tablet

#### **Custom Metrics**
1. **time_spent**: Time spent using tool
2. **tools_used**: Number of tools used per session
3. **completion_rate**: Tool completion percentage

### 4. Conversion Events

#### **Mark as Conversions**
1. `tool_completion` - Primary conversion
2. `file_download` - Secondary conversion
3. `form_submit` - Lead generation
4. `newsletter_signup` - Engagement

#### **Enhanced Ecommerce (Future)**
```javascript
// For future premium features
gtag('event', 'purchase', {
  'transaction_id': 'T12345',
  'value': 9.99,
  'currency': 'USD',
  'items': [{
    'item_id': 'premium_tools',
    'item_name': 'Premium Tool Access',
    'category': 'Subscription',
    'quantity': 1,
    'price': 9.99
  }]
});
```

## 🏷️ Google Tag Manager (GTM) Setup

### 1. Create GTM Container

#### **Container Setup**
1. **Go to GTM**: [tagmanager.google.com](https://tagmanager.google.com)
2. **Create Account**: "ToolBank"
3. **Create Container**:
   - Container Name: "ToolBank Website"
   - Target Platform: Web
4. **Copy Container ID**: `GTM-XXXXXXX`

### 2. Configure Tags

#### **GA4 Configuration Tag**
- **Tag Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: `{{GA4 Measurement ID}}`
- **Trigger**: All Pages
- **Configuration Settings**:
  ```
  send_page_view: true
  custom_map.tool_category: tool_category
  custom_map.tool_difficulty: tool_difficulty
  ```

#### **Tool Usage Event Tag**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: GA4 Configuration
- **Event Name**: `tool_usage`
- **Event Parameters**:
  ```
  tool_name: {{Tool Name}}
  tool_category: {{Tool Category}}
  event_category: Tools
  ```
- **Trigger**: Custom Event - tool_usage

#### **Download Tracking Tag**
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: `file_download`
- **Event Parameters**:
  ```
  file_name: {{File Name}}
  file_type: {{File Type}}
  tool_name: {{Tool Name}}
  ```
- **Trigger**: Click - All Elements
- **Conditions**: Click URL contains `.pdf`, `.doc`, `.xls`

### 3. Configure Triggers

#### **Page View Trigger**
- **Trigger Type**: Page View
- **Trigger Name**: All Pages
- **Fire On**: All Page Views

#### **Tool Usage Trigger**
- **Trigger Type**: Custom Event
- **Event Name**: `tool_usage`
- **Fire On**: Some Custom Events
- **Conditions**: Event equals tool_usage

#### **Download Trigger**
- **Trigger Type**: Click - All Elements
- **Fire On**: Some Clicks
- **Conditions**: 
  - Click URL matches RegEx: `\.(pdf|doc|docx|xls|xlsx|zip)$`

#### **Form Submission Trigger**
- **Trigger Type**: Form Submission
- **Fire On**: Some Forms
- **Conditions**: Form ID contains "contact"

### 4. Configure Variables

#### **Built-in Variables**
Enable these built-in variables:
- Page URL
- Page Title
- Referrer
- Click Element
- Click URL
- Form Element

#### **Custom Variables**

**GA4 Measurement ID**
- **Variable Type**: Constant
- **Value**: `G-XXXXXXXXXX`

**Tool Name**
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `tool_name`

**Tool Category**
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `tool_category`

### 5. Data Layer Implementation

#### **Tool Usage Data Layer**
```javascript
// When user starts using a tool
dataLayer.push({
  'event': 'tool_usage',
  'tool_name': 'BMI Calculator',
  'tool_category': 'Health & Fitness',
  'tool_difficulty': 'beginner'
});

// When user completes a tool
dataLayer.push({
  'event': 'tool_completion',
  'tool_name': 'BMI Calculator',
  'tool_category': 'Health & Fitness',
  'time_spent': 120,
  'result_generated': true
});
```

## 🔍 Google Search Console Setup

### 1. Property Setup

#### **Add Property**
1. **Go to GSC**: [search.google.com/search-console](https://search.google.com/search-console)
2. **Add Property**: Choose "Domain" property
3. **Domain**: `toolbank.netlify.app`
4. **Verify Ownership**: DNS verification (recommended)

#### **DNS Verification**
Add TXT record to your domain:
```
Type: TXT
Name: @
Value: google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Sitemap Submission

#### **Submit Main Sitemap**
1. **Go to Sitemaps**: In GSC sidebar
2. **Add Sitemap**: `https://toolbank.netlify.app/sitemap.xml`
3. **Submit**: Wait for processing

#### **Monitor Sitemap Status**
- **Submitted**: Number of URLs submitted
- **Indexed**: Number of URLs indexed
- **Errors**: Any indexing issues

### 3. URL Inspection

#### **Test Key Pages**
Test these important pages:
1. **Homepage**: `/`
2. **Popular Tools**:
   - `/bmi-calculator`
   - `/invoice-generator`
   - `/qr-code-generator`
3. **Category Pages**:
   - `/tools/health-fitness`
   - `/tools/finance-business`

#### **Check for Issues**
- Mobile usability
- Core Web Vitals
- Structured data
- Indexing status

### 4. Performance Monitoring

#### **Core Web Vitals**
Monitor these metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

#### **Search Performance**
Track these KPIs:
- **Impressions**: How often your site appears
- **Clicks**: How often users click
- **CTR**: Click-through rate
- **Position**: Average ranking position

#### **Key Queries to Monitor**
- "BMI calculator"
- "free invoice generator"
- "QR code generator"
- "online tools"
- "free calculators"

## 📈 Analytics Implementation

### 1. Code Integration

#### **Environment Variables**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

#### **Analytics Provider**
The `AnalyticsProvider` component automatically:
- Initializes GA4 and GTM
- Tracks page views
- Sets up event tracking
- Handles error tracking

### 2. Event Tracking Usage

#### **Tool Usage Tracking**
```typescript
import { useToolTracking } from '@/components/providers/AnalyticsProvider';

const { trackToolStart, trackToolComplete } = useToolTracking();

// When tool starts
trackToolStart('BMI Calculator', 'Health & Fitness');

// When tool completes
trackToolComplete('BMI Calculator', 'Health & Fitness', 120);
```

#### **Download Tracking**
```typescript
import { useDownloadTracking } from '@/components/providers/AnalyticsProvider';

const { trackDownload } = useDownloadTracking();

// When file is downloaded
trackDownload('invoice.pdf', 'pdf', 'Invoice Generator');
```

### 3. Custom Dashboards

#### **GA4 Custom Reports**
Create reports for:
1. **Tool Performance**: Usage by tool type
2. **User Journey**: Path through tools
3. **Conversion Funnel**: Tool start → completion
4. **Device Analysis**: Mobile vs desktop usage

#### **GTM Debug Mode**
1. Enable Preview mode in GTM
2. Test all events fire correctly
3. Verify data layer values
4. Check tag firing sequence

## 🎯 Success Metrics

### **Primary KPIs**
- **Tool Usage Rate**: % of visitors who use tools
- **Tool Completion Rate**: % who complete tools
- **Session Duration**: Time spent on site
- **Pages per Session**: Site engagement

### **Secondary KPIs**
- **Download Rate**: File downloads per session
- **Return Visitor Rate**: User retention
- **Mobile Usage**: Mobile vs desktop split
- **Search Performance**: Organic traffic growth

### **Conversion Goals**
- **Primary**: Tool completion
- **Secondary**: File download
- **Tertiary**: Newsletter signup
- **Future**: Premium subscription

---

**🎉 Analytics Setup Complete!** Your ToolBank analytics implementation is now ready to track user behavior, tool usage, and business performance.
