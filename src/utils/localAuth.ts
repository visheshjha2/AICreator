interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  passwordHash: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

class LocalAuthService {
  private storageKey = 'ai-creator-auth';
  private usersKey = 'ai-creator-users';

  // Simple password hashing (in production, use bcrypt or similar)
  private hashPassword(password: string): string {
    // For demo purposes, we'll use a simple but consistent hash
    // In production, use bcrypt or similar
    let hash = 0;
    if (password.length === 0) return hash.toString();
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    try {
      const authData = localStorage.getItem(this.storageKey);
      if (authData) {
        const parsed = JSON.parse(authData);
        return {
          ...parsed.user,
          createdAt: new Date(parsed.user.createdAt)
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get all registered users
  private getUsers(): User[] {
    try {
      const users = localStorage.getItem(this.usersKey);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    try {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  // Sign up new user
  async signUp(email: string, password: string, displayName: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = this.getUsers();
          
          // Check if user already exists
          if (users.find(user => user.email === email)) {
            reject(new Error('auth/email-already-in-use'));
            return;
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            reject(new Error('auth/invalid-email'));
            return;
          }

          // Validate password strength
          if (password.length < 6) {
            reject(new Error('auth/weak-password'));
            return;
          }

          // Create new user
          const newUser: User = {
            id: Date.now().toString(),
            email,
            displayName: displayName.trim() || email.split('@')[0],
            createdAt: new Date(),
            passwordHash: this.hashPassword(password)
          };

          // Save user
          users.push(newUser);
          this.saveUsers(users);

          // Set as current user
          localStorage.setItem(this.storageKey, JSON.stringify({ user: newUser }));

          resolve(newUser);
        } catch (error) {
          reject(new Error('auth/internal-error'));
        }
      }, 500); // Simulate network delay
    });
  }

  // Sign in existing user
  async signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = this.getUsers();
          const user = users.find(u => u.email === email);

          if (!user) {
            reject(new Error('auth/user-not-found'));
            return;
          }

          // Verify password
          const passwordHash = this.hashPassword(password);
          if (user.passwordHash !== passwordHash) {
            reject(new Error('auth/wrong-password'));
            return;
          }

          // Set as current user
          localStorage.setItem(this.storageKey, JSON.stringify({ user }));

          resolve(user);
        } catch (error) {
          reject(new Error('auth/internal-error'));
        }
      }, 500); // Simulate network delay
    });
  }

  // Sign out
  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(this.storageKey);
        resolve();
      }, 200);
    });
  }

  // Update user profile
  async updateProfile(updates: Partial<Pick<User, 'displayName'>>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const currentUser = this.getCurrentUser();
          if (!currentUser) {
            reject(new Error('auth/user-not-found'));
            return;
          }

          const users = this.getUsers();
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          
          if (userIndex === -1) {
            reject(new Error('auth/user-not-found'));
            return;
          }

          // Update user
          const updatedUser = { ...users[userIndex], ...updates };
          users[userIndex] = updatedUser;
          this.saveUsers(users);

          // Update current user
          localStorage.setItem(this.storageKey, JSON.stringify({ user: updatedUser }));

          resolve(updatedUser);
        } catch (error) {
          reject(new Error('auth/internal-error'));
        }
      }, 300);
    });
  }
}

export const localAuth = new LocalAuthService();
export type { User };