// Authentication Service
// Handles user authentication and role management

class AuthService {
    constructor() {
        this.currentUser = null;
        this.userRole = null;
        this.auth = null;
        this.initializeAuth();
    }

    initializeAuth() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            this.auth = firebase.auth();
            
            // Listen for auth state changes
            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    this.currentUser = user;
                    this.loadUserRole(user.uid);
                } else {
                    this.currentUser = null;
                    this.userRole = null;
                }
                this.updateUI();
            });
        } else {
            console.warn('Firebase Auth not available');
        }
    }

    // Load user role from Firestore
    async loadUserRole(uid) {
        if (!this.auth || !firebase.firestore) {
            // Fallback to localStorage
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            this.userRole = userData.role || 'client';
            return;
        }

        try {
            const db = firebase.firestore();
            const userDoc = await db.collection('users').doc(uid).get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                this.userRole = userData.role || 'client';
                
                // Save to localStorage as backup
                localStorage.setItem('userData', JSON.stringify({
                    uid: uid,
                    role: this.userRole,
                    email: userData.email
                }));
            } else {
                // Default role for new users
                this.userRole = 'client';
            }
        } catch (error) {
            console.error('Error loading user role:', error);
            this.userRole = 'client';
        }
    }

    // Register new user
    async register(email, password, role = 'client', additionalData = {}) {
        if (!this.auth) {
            throw new Error('Firebase Auth not initialized');
        }

        try {
            // Create user
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            if (firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('users').doc(user.uid).set({
                    email: email,
                    role: role,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    ...additionalData
                });
            }

            // Save to localStorage as backup
            localStorage.setItem('userData', JSON.stringify({
                uid: user.uid,
                role: role,
                email: email
            }));

            this.userRole = role;
            return { success: true, user: user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Login user
    async login(email, password) {
        if (!this.auth) {
            throw new Error('Firebase Auth not initialized');
        }

        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Load user role
            await this.loadUserRole(user.uid);
            
            return { success: true, user: user, role: this.userRole };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout user
    async logout() {
        if (this.auth) {
            await this.auth.signOut();
        }
        
        this.currentUser = null;
        this.userRole = null;
        localStorage.removeItem('userData');
        this.updateUI();
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Check if user is admin
    isAdmin() {
        return this.userRole === 'admin';
    }

    // Check if user is client
    isClient() {
        return this.userRole === 'client' || this.userRole === null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user role
    getUserRole() {
        return this.userRole;
    }

    // Update UI based on auth state
    updateUI() {
        // Show/hide admin features
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = this.isAdmin() ? 'block' : 'none';
        });

        // Show/hide client features
        const clientElements = document.querySelectorAll('.client-only');
        clientElements.forEach(el => {
            el.style.display = this.isClient() ? 'block' : 'none';
        });

        // Update login/logout button
        const loginBtn = document.getElementById('loginButton');
        const logoutBtn = document.getElementById('logoutButton');
        const userInfo = document.getElementById('userInfo');

        if (this.isAuthenticated()) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userInfo) {
                userInfo.innerHTML = `
                    <span style="color: white; font-size: 12px;">
                        ${this.currentUser.email} 
                        <span style="background: ${this.isAdmin() ? '#ef4444' : '#3b82f6'}; padding: 2px 8px; border-radius: 4px; margin-left: 8px;">
                            ${this.isAdmin() ? 'ADMIN' : 'CLIENT'}
                        </span>
                    </span>
                `;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.innerHTML = '';
        }
    }

    // Require authentication (redirect to login if not authenticated)
    requireAuth() {
        if (!this.isAuthenticated()) {
            showLoginModal();
            return false;
        }
        return true;
    }

    // Require admin role
    requireAdmin() {
        if (!this.isAuthenticated()) {
            showLoginModal();
            return false;
        }
        if (!this.isAdmin()) {
            alert('⚠️ Admin access required. You do not have permission to access this feature.');
            return false;
        }
        return true;
    }
}

// Create global instance
const authService = new AuthService();
