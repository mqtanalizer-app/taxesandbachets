// Database Service - Using Firebase Firestore v9+ Modular SDK
import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    addDoc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

class DatabaseService {
    constructor() {
        this.db = db;
        this.isAvailable = db !== null;
    }

    isFirestoreAvailable() {
        return this.isAvailable;
    }

    // Save client quote to Firestore
    async saveClientQuote(clientData) {
        if (!this.isAvailable) {
            console.warn('Firestore not available, using localStorage fallback');
            return this.saveToLocalStorage(clientData);
        }

        try {
            const quoteId = clientData.quoteId || clientData.quoteNumber?.toLowerCase().replace(/\s+/g, '-') || `quote-${Date.now()}`;
            const quoteRef = doc(db, 'clients', quoteId);

            // Prepare data with timestamps
            const dataToSave = {
                ...clientData,
                quoteId: quoteId,
                updatedAt: serverTimestamp()
            };

            // If document doesn't exist, set createdAt
            const docSnap = await getDoc(quoteRef);
            if (!docSnap.exists()) {
                dataToSave.createdAt = serverTimestamp();
            }

            await setDoc(quoteRef, dataToSave, { merge: true });

            return {
                success: true,
                quoteId: quoteId,
                message: 'Client quote saved successfully to Firestore'
            };
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            // Fallback to localStorage
            return this.saveToLocalStorage(clientData);
        }
    }

    // Load client quote from Firestore
    async loadClientQuote(quoteId) {
        if (!this.isAvailable) {
            return this.loadFromLocalStorage(quoteId);
        }

        try {
            const quoteRef = doc(db, 'clients', quoteId);
            const docSnap = await getDoc(quoteRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    success: true,
                    data: data
                };
            } else {
                return {
                    success: false,
                    error: 'Quote not found'
                };
            }
        } catch (error) {
            console.error('Error loading from Firestore:', error);
            return this.loadFromLocalStorage(quoteId);
        }
    }

    // Search client by password
    async searchClientByPassword(password) {
        if (!this.isAvailable) {
            return this.searchInLocalStorage(password);
        }

        try {
            const q = query(
                collection(db, 'clients'),
                where('clientPassword', '==', password),
                where('deleted', '!=', true)
            );

            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return {
                    success: true,
                    data: { id: doc.id, ...doc.data() }
                };
            } else {
                return {
                    success: false,
                    error: 'Client not found with that password'
                };
            }
        } catch (error) {
            console.error('Error searching in Firestore:', error);
            return this.searchInLocalStorage(password);
        }
    }

    // Get all clients
    async getAllClients() {
        if (!this.isAvailable) {
            return this.getAllFromLocalStorage();
        }

        try {
            const q = query(
                collection(db, 'clients'),
                where('deleted', '!=', true)
            );

            const querySnapshot = await getDocs(q);
            const clients = [];

            querySnapshot.forEach((doc) => {
                clients.push({
                    id: doc.id,
                    quoteId: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                clients: clients
            };
        } catch (error) {
            console.error('Error getting clients from Firestore:', error);
            return this.getAllFromLocalStorage();
        }
    }

    // Update client status
    async updateClientStatus(quoteId, status) {
        if (!this.isAvailable) {
            return { success: false, error: 'Firestore not available' };
        }

        try {
            const quoteRef = doc(db, 'clients', quoteId);
            await updateDoc(quoteRef, {
                status: status,
                updatedAt: serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error updating client status:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete client (soft delete)
    async deleteClient(quoteId) {
        if (!this.isAvailable) {
            return this.deleteFromLocalStorage(quoteId);
        }

        try {
            const quoteRef = doc(db, 'clients', quoteId);
            await updateDoc(quoteRef, {
                deleted: true,
                deletedAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error deleting client:', error);
            return { success: false, error: error.message };
        }
    }

    // LocalStorage fallback methods
    saveToLocalStorage(clientData) {
        try {
            const key = `client_${clientData.quoteId || clientData.quoteNumber || Date.now()}`;
            localStorage.setItem(key, JSON.stringify({
                ...clientData,
                savedAt: new Date().toISOString()
            }));
            return { success: true, message: 'Saved to localStorage' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    loadFromLocalStorage(quoteId) {
        try {
            const key = `client_${quoteId}`;
            const data = localStorage.getItem(key);
            if (data) {
                return { success: true, data: JSON.parse(data) };
            }
            return { success: false, error: 'Not found in localStorage' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    searchInLocalStorage(password) {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('client_'));
            for (const key of keys) {
                const data = JSON.parse(localStorage.getItem(key));
                if (data.clientPassword === password) {
                    return { success: true, data: data };
                }
            }
            return { success: false, error: 'Not found' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    getAllFromLocalStorage() {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('client_'));
            const clients = keys.map(key => ({
                id: key.replace('client_', ''),
                ...JSON.parse(localStorage.getItem(key))
            }));
            return { success: true, clients: clients };
        } catch (error) {
            return { success: false, error: error.message, clients: [] };
        }
    }

    deleteFromLocalStorage(quoteId) {
        try {
            const key = `client_${quoteId}`;
            localStorage.removeItem(key);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Create and export singleton instance
const databaseService = new DatabaseService();
export default databaseService;