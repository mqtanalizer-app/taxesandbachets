// IRS Forms Updater Script
// Runs periodically to check for and download updated IRS forms
// This runs on GitHub Actions or can be run locally

const https = require('https');
const fs = require('fs');
const path = require('path');

class IRSFormsUpdater {
    constructor() {
        this.irsBaseUrl = 'https://www.irs.gov/pub/irs-pdf/';
        this.formsList = [
            { id: '1040', filename: 'f1040.pdf', name: 'Form 1040', year: 2024 },
            { id: '1040-sr', filename: 'f1040sr.pdf', name: 'Form 1040-SR', year: 2024 },
            { id: 'w-7', filename: 'fw7.pdf', name: 'Form W-7', year: 2024 },
            { id: 'w-9', filename: 'fw9.pdf', name: 'Form W-9', year: 2024 },
            { id: '1040-schedule-a', filename: 'f1040sa.pdf', name: 'Schedule A', year: 2024 },
            { id: '1040-schedule-b', filename: 'f1040sb.pdf', name: 'Schedule B', year: 2024 },
            { id: '1040-schedule-c', filename: 'f1040sc.pdf', name: 'Schedule C', year: 2024 },
            { id: '1040-schedule-d', filename: 'f1040sd.pdf', name: 'Schedule D', year: 2024 },
            { id: '1040-schedule-e', filename: 'f1040se.pdf', name: 'Schedule E', year: 2024 },
            { id: '1040-schedule-se', filename: 'f1040sse.pdf', name: 'Schedule SE', year: 2024 },
        ];
        this.databaseFile = path.join(__dirname, 'forms-database.json');
    }

    // Check if form URL exists and get last modified date
    async checkFormUpdate(formInfo) {
        return new Promise((resolve, reject) => {
            const url = `${this.irsBaseUrl}${formInfo.filename}`;
            const options = {
                method: 'HEAD',
                headers: {
                    'User-Agent': 'IRS-Forms-Updater/1.0'
                }
            };

            https.request(url, options, (res) => {
                if (res.statusCode === 200) {
                    resolve({
                        exists: true,
                        lastModified: res.headers['last-modified'],
                        contentLength: res.headers['content-length'],
                        url: url
                    });
                } else {
                    resolve({
                        exists: false,
                        statusCode: res.statusCode
                    });
                }
            }).on('error', reject).end();
        });
    }

    // Load existing database
    loadDatabase() {
        try {
            if (fs.existsSync(this.databaseFile)) {
                const data = fs.readFileSync(this.databaseFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading database:', error);
        }
        return { forms: [], lastUpdated: null };
    }

    // Save database
    saveDatabase(database) {
        try {
            database.lastUpdated = new Date().toISOString();
            fs.writeFileSync(this.databaseFile, JSON.stringify(database, null, 2));
            console.log('Database saved successfully');
        } catch (error) {
            console.error('Error saving database:', error);
        }
    }

    // Update forms database
    async updateForms() {
        console.log('Starting IRS forms update check...');
        const database = this.loadDatabase();
        const updatedForms = [];
        const newForms = [];

        for (const form of this.formsList) {
            try {
                console.log(`Checking ${form.name}...`);
                const checkResult = await this.checkFormUpdate(form);

                if (checkResult.exists) {
                    const existingForm = database.forms.find(f => f.id === form.id && f.year === form.year);
                    
                    const formData = {
                        id: form.id,
                        name: form.name,
                        year: form.year,
                        filename: form.filename,
                        downloadUrl: checkResult.url,
                        lastModified: checkResult.lastModified,
                        size: parseInt(checkResult.contentLength || 0),
                        checkedAt: new Date().toISOString()
                    };

                    if (existingForm) {
                        // Check if form was updated
                        if (existingForm.lastModified !== checkResult.lastModified) {
                            updatedForms.push(formData);
                            const index = database.forms.indexOf(existingForm);
                            database.forms[index] = formData;
                        } else {
                            // Update checkedAt timestamp
                            existingForm.checkedAt = new Date().toISOString();
                        }
                    } else {
                        newForms.push(formData);
                        database.forms.push(formData);
                    }
                } else {
                    console.warn(`Form ${form.name} not found (Status: ${checkResult.statusCode})`);
                }

                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`Error checking ${form.name}:`, error.message);
            }
        }

        this.saveDatabase(database);

        console.log('\nUpdate Summary:');
        console.log(`- Forms checked: ${this.formsList.length}`);
        console.log(`- New forms: ${newForms.length}`);
        console.log(`- Updated forms: ${updatedForms.length}`);
        
        if (newForms.length > 0) {
            console.log('\nNew forms:');
            newForms.forEach(f => console.log(`  - ${f.name} (${f.id})`));
        }
        
        if (updatedForms.length > 0) {
            console.log('\nUpdated forms:');
            updatedForms.forEach(f => console.log(`  - ${f.name} (${f.id})`));
        }

        return {
            success: true,
            checked: this.formsList.length,
            new: newForms.length,
            updated: updatedForms.length,
            forms: database.forms
        };
    }
}

// Run if executed directly
if (require.main === module) {
    const updater = new IRSFormsUpdater();
    updater.updateForms()
        .then(result => {
            console.log('\nUpdate completed successfully');
            process.exit(0);
        })
        .catch(error => {
            console.error('Update failed:', error);
            process.exit(1);
        });
}

module.exports = IRSFormsUpdater;
