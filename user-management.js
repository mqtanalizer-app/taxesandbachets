// User Management Service - Using Firebase Firestore v9+ Modular SDK
import { db } from './firebase-config.js';
import { auth } from './firebase-config.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp,
    Timestamp
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import {
    createUserWithEmailAndPassword,
    updatePassword,
    deleteUser,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

class UserManagementService {
    constructor() {
        this.db = db;
        this.auth = auth;
    }

    // Get all users
    async getAllUsers() {
        if (!this.db) {
            console.warn('Firestore not available');
            return [];
        }

        try {
            const usersCollection = collection(this.db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const users = [];

            usersSnapshot.forEach((doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Sort by creation date (newest first)
            users.sort((a, b) => {
                const dateA = a.createdAt?.toDate?.() || new Date(0);
                const dateB = b.createdAt?.toDate?.() || new Date(0);
                return dateB - dateA;
            });

            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // Get user by ID
    async getUserById(uid) {
        if (!this.db) {
            return null;
        }

        try {
            const userDoc = await getDoc(doc(this.db, 'users', uid));
            if (userDoc.exists()) {
                return {
                    id: userDoc.id,
                    ...userDoc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    // Create new user
    async createUser(email, password, role = 'client', additionalData = {}) {
        if (!this.auth) {
            throw new Error('Firebase Auth not initialized');
        }

        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            if (this.db) {
                await setDoc(doc(this.db, 'users', user.uid), {
                    email: email,
                    role: role,
                    active: true,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    ...additionalData
                });
            }

            return {
                success: true,
                user: {
                    id: user.uid,
                    email: email,
                    role: role,
                    active: true
                }
            };
        } catch (error) {
            console.error('Error creating user:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Update user data
    async updateUser(uid, updates) {
        if (!this.db) {
            throw new Error('Firestore not available');
        }

        try {
            const userRef = doc(this.db, 'users', uid);
            await updateDoc(userRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error updating user:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Change user role
    async changeUserRole(uid, newRole) {
        return await this.updateUser(uid, { role: newRole });
    }

    // Activate/Deactivate user
    async setUserActive(uid, active) {
        return await this.updateUser(uid, { active: active });
    }

    // Delete user (requires admin to be signed in as the user first, then delete from Firestore)
    async deleteUser(uid) {
        if (!this.db) {
            throw new Error('Firestore not available');
        }

        try {
            // Delete user document from Firestore
            await deleteDoc(doc(this.db, 'users', uid));
            
            // Note: To delete from Firebase Auth, you need to sign in as that user first
            // This is a security feature. For now, we only delete from Firestore.
            // The user won't be able to log in if their document doesn't exist.
            
            return { success: true };
        } catch (error) {
            console.error('Error deleting user:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Send password reset email
    async sendPasswordReset(userEmail) {
        if (!this.auth) {
            throw new Error('Firebase Auth not initialized');
        }

        try {
            await sendPasswordResetEmail(this.auth, userEmail);
            return { success: true };
        } catch (error) {
            console.error('Error sending password reset:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get user statistics
    async getUserStatistics() {
        try {
            const users = await this.getAllUsers();
            
            const stats = {
                total: users.length,
                admins: users.filter(u => u.role === 'admin').length,
                clients: users.filter(u => u.role === 'client').length,
                active: users.filter(u => u.active !== false).length,
                inactive: users.filter(u => u.active === false).length
            };

            return stats;
        } catch (error) {
            console.error('Error getting user statistics:', error);
            return {
                total: 0,
                admins: 0,
                clients: 0,
                active: 0,
                inactive: 0
            };
        }
    }

    // Search users
    async searchUsers(searchTerm) {
        try {
            const users = await this.getAllUsers();
            const term = searchTerm.toLowerCase();

            return users.filter(user => {
                return (
                    user.email?.toLowerCase().includes(term) ||
                    user.role?.toLowerCase().includes(term) ||
                    user.id?.toLowerCase().includes(term)
                );
            });
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }
}

// Create global instance
const userManagementService = new UserManagementService();
export default userManagementService;

