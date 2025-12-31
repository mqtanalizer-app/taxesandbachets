# IRS Forms Management System

This system automatically downloads and manages IRS forms from official sources, with AI-powered assistance for form completion.

## Features

### 1. Automated Form Downloads
- Periodically checks official IRS website for form updates
- Downloads latest versions of all required forms
- Stores form metadata in database

### 2. Official IRS Sources
- **Primary Source**: https://www.irs.gov/pub/irs-pdf/
- Forms are downloaded directly from official IRS servers
- All forms are verified for authenticity

### 3. AI-Powered Form Management
- Intelligent form recommendations based on client data
- Automated form requirement analysis
- Form validation and error checking
- Smart suggestions for form completion

### 4. Periodic Updates
- GitHub Actions workflow runs weekly (Mondays at 2 AM UTC)
- Checks for new form versions
- Updates database automatically
- Can be triggered manually if needed

## Supported Forms

### Individual Tax Forms
- Form 1040 (U.S. Individual Income Tax Return)
- Form 1040-SR (Seniors)
- Form W-7 (ITIN Application)
- Form W-9 (Request for Taxpayer Identification Number)

### Schedules
- Schedule A (Itemized Deductions)
- Schedule B (Interest and Ordinary Dividends)
- Schedule C (Profit or Loss from Business) ⭐ Required
- Schedule D (Capital Gains and Losses)
- Schedule E (Supplemental Income and Loss)
- Schedule SE (Self-Employment Tax)

### Business Forms
- Form 1120 (U.S. Corporation Income Tax Return)
- Form 1065 (U.S. Return of Partnership Income)
- Form 1120-S (U.S. Income Tax Return for an S Corporation)

### Information Returns
- Form 1099-NEC (Nonemployee Compensation)
- Form 1099-MISC (Miscellaneous Income)
- Form 1099-K (Payment Card and Third Party Network Transactions)

## Setup Instructions

### 1. GitHub Actions Setup (for automated updates)

The system uses GitHub Actions to periodically check for form updates. This is already configured in `.github/workflows/update-irs-forms.yml`.

**To enable:**
1. Go to your GitHub repository Settings > Secrets and variables > Actions
2. Add any required secrets (currently none required for basic operation)
3. The workflow will run automatically every Monday

**To run manually:**
1. Go to Actions tab in GitHub
2. Select "Update IRS Forms" workflow
3. Click "Run workflow"

### 2. Local Development Setup

To run the forms updater locally:

```bash
npm install axios cheerio
node forms-updater.js
```

### 3. Integration with Application

The forms system is integrated into the main application:

```javascript
// Access forms manager
const forms = irsFormsManager.getAllForms();

// Get forms by category
const individualForms = irsFormsManager.getFormsByCategory('Individual');

// Download a form
const result = await irsFormsManager.downloadForm('w-7', 2024);

// Use AI assistant
const recommendations = await aiFormsAssistant.getFormRecommendations(clientProfile);
```

## AI Integration

### Current AI Features

1. **Form Requirement Analysis**
   - Analyzes client data to determine which forms are needed
   - Provides priority levels for each form
   - Gives reasons for each recommendation

2. **Form Validation**
   - Validates form data before submission
   - Provides error messages and warnings
   - Suggests corrections

3. **Intelligent Suggestions**
   - Recommends forms based on client situation
   - Provides deadlines for each form
   - Prioritizes critical forms

### Future AI Enhancements (Optional)

To enable full AI capabilities with OpenAI:

1. Get OpenAI API key from https://platform.openai.com/
2. Set environment variable or add to config:
   ```javascript
   aiFormsAssistant.initialize('your-openai-api-key');
   ```
3. Advanced features will then be available:
   - Natural language form questions
   - Contextual help and guidance
   - Advanced data validation
   - Automated error detection

## File Structure

```
taxesandbachets/
├── forms-downloader.js       # Client-side forms manager
├── ai-forms-assistant.js     # AI-powered form assistance
├── forms-updater.js          # Server-side updater script
├── forms-database.json       # Forms metadata database
├── .github/
│   └── workflows/
│       └── update-irs-forms.yml  # Automated update workflow
└── IRS-FORMS-SYSTEM.md       # This documentation
```

## Database Structure

Forms are stored with the following metadata:

```json
{
  "id": "w-7",
  "name": "Form W-7",
  "category": "Individual",
  "year": 2024,
  "filename": "fw7.pdf",
  "downloadUrl": "https://www.irs.gov/pub/irs-pdf/fw7.pdf",
  "lastModified": "2024-01-15T00:00:00Z",
  "size": 123456,
  "checkedAt": "2024-12-19T12:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Monitoring and Maintenance

### Check Update Status

The system logs update status to:
- GitHub Actions logs (for automated runs)
- Console output (for manual runs)
- Database file timestamp (lastUpdated field)

### Manual Update

To manually trigger an update:

1. **Via GitHub Actions:**
   - Go to Actions > Update IRS Forms > Run workflow

2. **Locally:**
   ```bash
   node forms-updater.js
   ```

3. **Via API (if implemented):**
   ```javascript
   await irsFormsManager.checkForUpdates();
   ```

## Security Considerations

- All forms are downloaded from official IRS servers only
- Forms are verified before being stored
- No sensitive client data is sent to external services
- AI features are optional and can be disabled

## Troubleshooting

### Forms not updating

1. Check GitHub Actions logs for errors
2. Verify IRS website is accessible
3. Check form IDs match IRS naming conventions
4. Review forms-database.json for last update timestamp

### AI features not working

1. Verify API key is set (if using OpenAI)
2. Check browser console for errors
3. AI features have rule-based fallbacks

### Forms not appearing in UI

1. Ensure forms-downloader.js is loaded
2. Check forms-database.json has data
3. Verify form categories match UI filters

## Future Enhancements

- [ ] PDF parsing and field extraction
- [ ] Automated form filling from database
- [ ] Form version history tracking
- [ ] Email notifications for form updates
- [ ] Integration with IRS e-file system
- [ ] Multi-year form support
- [ ] Form comparison tools
- [ ] Advanced AI form analysis

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review forms-database.json
3. Check browser console for errors
4. Review this documentation
