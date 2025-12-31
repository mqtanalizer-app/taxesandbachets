// IRS Forms Downloader and Manager
// Downloads forms from official IRS sources and manages them in Firebase

class IRSFormsManager {
    constructor() {
        this.irsFormsApi = 'https://apps.irs.gov/app/picklist/list/formsPublications.html';
        this.irsFormDownloadBase = 'https://www.irs.gov/pub/irs-pdf/';
        this.formsList = [
            // Individual Tax Forms
            { id: '1040', name: 'Form 1040', category: 'Individual', year: 2024, required: true },
            { id: '1040-sr', name: 'Form 1040-SR', category: 'Individual', year: 2024, required: false },
            { id: 'w-7', name: 'Form W-7', category: 'Individual', year: 2024, required: true },
            { id: 'w-9', name: 'Form W-9', category: 'Individual', year: 2024, required: false },
            
            // Schedules
            { id: '1040-schedule-a', name: 'Schedule A (Form 1040)', category: 'Schedule', year: 2024, required: false },
            { id: '1040-schedule-b', name: 'Schedule B (Form 1040)', category: 'Schedule', year: 2024, required: false },
            { id: '1040-schedule-c', name: 'Schedule C (Form 1040)', category: 'Schedule', year: 2024, required: true },
            { id: '1040-schedule-d', name: 'Schedule D (Form 1040)', category: 'Schedule', year: 2024, required: false },
            { id: '1040-schedule-e', name: 'Schedule E (Form 1040)', category: 'Schedule', year: 2024, required: false },
            { id: '1040-schedule-f', name: 'Schedule F (Form 1040)', category: 'Schedule', year: 2024, required: false },
            { id: '1040-schedule-se', name: 'Schedule SE (Form 1040)', category: 'Schedule', year: 2024, required: false },
            
            // Business Forms
            { id: '1120', name: 'Form 1120', category: 'Business', year: 2024, required: false },
            { id: '1065', name: 'Form 1065', category: 'Business', year: 2024, required: false },
            { id: '1120s', name: 'Form 1120-S', category: 'Business', year: 2024, required: false },
            
            // Information Returns
            { id: '1099-nec', name: 'Form 1099-NEC', category: 'Information', year: 2024, required: false },
            { id: '1099-misc', name: 'Form 1099-MISC', category: 'Information', year: 2024, required: false },
            { id: '1099-k', name: 'Form 1099-K', category: 'Information', year: 2024, required: false },
        ];
    }

    // Get official IRS form download URL
    getFormDownloadUrl(formId, year = 2024) {
        // IRS uses specific naming conventions
        const formMap = {
            '1040': `f1040.pdf`,
            '1040-sr': `f1040sr.pdf`,
            'w-7': `fw7.pdf`,
            'w-9': `fw9.pdf`,
            '1040-schedule-a': `f1040sa.pdf`,
            '1040-schedule-b': `f1040sb.pdf`,
            '1040-schedule-c': `f1040sc.pdf`,
            '1040-schedule-d': `f1040sd.pdf`,
            '1040-schedule-e': `f1040se.pdf`,
            '1040-schedule-f': `f1040sf.pdf`,
            '1040-schedule-se': `f1040sse.pdf`,
            '1120': `f1120.pdf`,
            '1065': `f1065.pdf`,
            '1120s': `f1120s.pdf`,
            '1099-nec': `f1099nec.pdf`,
            '1099-misc': `f1099misc.pdf`,
            '1099-k': `f1099k.pdf`,
        };

        const filename = formMap[formId.toLowerCase()] || `${formId.toLowerCase()}.pdf`;
        return `${this.irsFormDownloadBase}${filename}`;
    }

    // Download form from IRS website
    async downloadForm(formId, year = 2024) {
        try {
            const downloadUrl = this.getFormDownloadUrl(formId, year);
            
            // In a real implementation, this would be done server-side
            // For client-side, we'll provide the URL and let the browser handle it
            return {
                success: true,
                formId: formId,
                downloadUrl: downloadUrl,
                year: year,
                downloadedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error(`Error downloading form ${formId}:`, error);
            return {
                success: false,
                formId: formId,
                error: error.message
            };
        }
    }

    // Get all available forms
    getAllForms() {
        return this.formsList;
    }

    // Get forms by category
    getFormsByCategory(category) {
        return this.formsList.filter(form => form.category === category);
    }

    // Get required forms
    getRequiredForms() {
        return this.formsList.filter(form => form.required === true);
    }

    // Check for form updates (this would be called periodically)
    async checkForUpdates() {
        // In a real implementation, this would:
        // 1. Check IRS website for latest form versions
        // 2. Compare with stored versions in database
        // 3. Download updated forms
        // 4. Notify administrators of updates
        
        console.log('Checking for form updates...');
        return {
            checkedAt: new Date().toISOString(),
            updatesAvailable: false,
            updatedForms: []
        };
    }

    // Save form metadata to Firebase
    async saveFormMetadata(formData) {
        // This would save to Firestore
        // For now, we'll use localStorage as fallback
        try {
            const formsData = JSON.parse(localStorage.getItem('irsFormsDatabase') || '[]');
            const existingIndex = formsData.findIndex(f => f.id === formData.id && f.year === formData.year);
            
            if (existingIndex >= 0) {
                formsData[existingIndex] = { ...formsData[existingIndex], ...formData, updatedAt: new Date().toISOString() };
            } else {
                formsData.push({ ...formData, createdAt: new Date().toISOString() });
            }
            
            localStorage.setItem('irsFormsDatabase', JSON.stringify(formsData));
            return { success: true };
        } catch (error) {
            console.error('Error saving form metadata:', error);
            return { success: false, error: error.message };
        }
    }

    // Get stored form metadata
    getStoredForms() {
        try {
            return JSON.parse(localStorage.getItem('irsFormsDatabase') || '[]');
        } catch (error) {
            console.error('Error getting stored forms:', error);
            return [];
        }
    }
}

// Create global instance
const irsFormsManager = new IRSFormsManager();
