// Database Service Module
// Handles all Firestore database operations with localStorage fallback

class DatabaseService {
    constructor() {
        this.db = null;
        this.useFirestore = false;
        this.initializeFirestore();
    }

    initializeFirestore() {
        // Check if Firestore is available
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                this.db = firebase.firestore();
                this.useFirestore = true;
                console.log('✅ Firestore database ready');
            } catch (error) {
                console.warn('⚠️ Firestore initialization error:', error);
                this.useFirestore = false;
            }
        } else {
            console.warn('⚠️ Firestore not available. Using localStorage fallback.');
            this.useFirestore = false;
        }
    }

    // Save client quote data
    async saveClientQuote(quoteId, quoteData) {
        try {
            if (this.useFirestore && this.db) {
                // Add metadata
                const dataWithMetadata = {
                    ...quoteData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    quoteId: quoteId
                };

                await this.db.collection('clients').doc(quoteId).set(dataWithMetadata, { merge: true });
                
                // Also save to localStorage as backup
                localStorage.setItem('secureAssetsQuote2025', JSON.stringify(quoteData));
                
                return { success: true, id: quoteId, source: 'firestore' };
            } else {
                // Fallback to localStorage
                localStorage.setItem('secureAssetsQuote2025', JSON.stringify(quoteData));
                return { success: true, id: quoteId, source: 'localStorage' };
            }
        } catch (error) {
            console.error('Error saving quote:', error);
            // Fallback to localStorage on error
            try {
                localStorage.setItem('secureAssetsQuote2025', JSON.stringify(quoteData));
                return { success: true, id: quoteId, source: 'localStorage-fallback' };
            } catch (localError) {
                return { success: false, error: localError.message };
            }
        }
    }

    // Load client quote data by ID
    async loadClientQuote(quoteId) {
        try {
            if (this.useFirestore && this.db) {
                const doc = await this.db.collection('clients').doc(quoteId).get();
                if (doc.exists) {
                    const data = doc.data();
                    // Also update localStorage
                    localStorage.setItem('secureAssetsQuote2025', JSON.stringify(data));
                    return { success: true, data: data, source: 'firestore' };
                } else {
                    // Try localStorage as fallback
                    const localData = localStorage.getItem('secureAssetsQuote2025');
                    if (localData) {
                        const data = JSON.parse(localData);
                        return { success: true, data: data, source: 'localStorage' };
                    }
                    return { success: false, error: 'Quote not found' };
                }
            } else {
                // Use localStorage
                const localData = localStorage.getItem('secureAssetsQuote2025');
                if (localData) {
                    const data = JSON.parse(localData);
                    return { success: true, data: data, source: 'localStorage' };
                }
                return { success: false, error: 'No data found' };
            }
        } catch (error) {
            console.error('Error loading quote:', error);
            // Fallback to localStorage
            try {
                const localData = localStorage.getItem('secureAssetsQuote2025');
                if (localData) {
                    const data = JSON.parse(localData);
                    return { success: true, data: data, source: 'localStorage-fallback' };
                }
                return { success: false, error: error.message };
            } catch (localError) {
                return { success: false, error: localError.message };
            }
        }
    }

    // Search client by password
    async searchClientByPassword(password) {
        try {
            if (this.useFirestore && this.db) {
                const snapshot = await this.db.collection('clients')
                    .where('clientPassword', '==', password)
                    .limit(1)
                    .get();

                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    return { success: true, data: doc.data(), id: doc.id, source: 'firestore' };
                }
                return { success: false, error: 'Client not found with this password' };
            } else {
                // Fallback: search in localStorage
                const localData = localStorage.getItem('secureAssetsQuote2025');
                if (localData) {
                    const data = JSON.parse(localData);
                    if (data.clientPassword === password) {
                        return { success: true, data: data, source: 'localStorage' };
                    }
                }
                return { success: false, error: 'Client not found' };
            }
        } catch (error) {
            console.error('Error searching client:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all clients (paginated)
    async getAllClients(limit = 50, startAfter = null) {
        try {
            if (this.useFirestore && this.db) {
                let query = this.db.collection('clients')
                    .orderBy('createdAt', 'desc')
                    .limit(limit);

                if (startAfter) {
                    query = query.startAfter(startAfter);
                }

                const snapshot = await query.get();
                const clients = [];
                snapshot.forEach(doc => {
                    clients.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                return { success: true, clients: clients, source: 'firestore' };
            } else {
                // Fallback: return current localStorage data as single item
                const localData = localStorage.getItem('secureAssetsQuote2025');
                if (localData) {
                    const data = JSON.parse(localData);
                    return { success: true, clients: [data], source: 'localStorage' };
                }
                return { success: true, clients: [], source: 'localStorage' };
            }
        } catch (error) {
            console.error('Error getting clients:', error);
            return { success: false, error: error.message, clients: [] };
        }
    }

    // Update client status (e.g., completed, in-progress, etc.)
    async updateClientStatus(quoteId, status) {
        try {
            if (this.useFirestore && this.db) {
                await this.db.collection('clients').doc(quoteId).update({
                    status: status,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                return { success: true, source: 'firestore' };
            } else {
                // Fallback: update localStorage
                const localData = localStorage.getItem('secureAssetsQuote2025');
                if (localData) {
                    const data = JSON.parse(localData);
                    data.status = status;
                    localStorage.setItem('secureAssetsQuote2025', JSON.stringify(data));
                    return { success: true, source: 'localStorage' };
                }
                return { success: false, error: 'Client not found' };
            }
        } catch (error) {
            console.error('Error updating status:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete client (soft delete by setting deleted flag)
    async deleteClient(quoteId) {
        try {
            if (this.useFirestore && this.db) {
                await this.db.collection('clients').doc(quoteId).update({
                    deleted: true,
                    deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                return { success: true, source: 'firestore' };
            } else {
                // Fallback: remove from localStorage
                localStorage.removeItem('secureAssetsQuote2025');
                return { success: true, source: 'localStorage' };
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            return { success: false, error: error.message };
        }
    }

    // Check if Firestore is available
    isFirestoreAvailable() {
        return this.useFirestore;
    }
}

// Create global instance
const databaseService = new DatabaseService();
