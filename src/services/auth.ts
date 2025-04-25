import type { User } from '../types';

class AuthService {
  private storage = window.localStorage;
  private readonly USERS_KEY = 'kingdom_chronicles_users';
  private readonly CURRENT_USER_KEY = 'kingdom_chronicles_current_user';
  private readonly TEST_ACCOUNT = {
    id: 'test123',
    username: 'test123',
    email: 'test123@gmail.com',
    password: 'test123',
    points: 0,
    achievements: []
  };

  private getUsers(): Record<string, User> {
    const users = this.storage.getItem(this.USERS_KEY);
    const existingUsers = users ? JSON.parse(users) : {};
    
    // Always ensure test account exists
    if (!existingUsers[this.TEST_ACCOUNT.id]) {
      existingUsers[this.TEST_ACCOUNT.id] = this.TEST_ACCOUNT;
      this.saveUsers(existingUsers);
    }
    
    return existingUsers;
  }

  private saveUsers(users: Record<string, User>) {
    // Ensure test account is never removed
    users[this.TEST_ACCOUNT.id] = this.TEST_ACCOUNT;
    this.storage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  async signIn(email: string, password: string): Promise<User> {
    const users = this.getUsers();
    const user = Object.values(users).find(u => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    this.storage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    return this.sanitizeUser(user);
  }

  async signUp(email: string, password: string, username: string): Promise<User> {
    const users = this.getUsers();
    
    if (Object.values(users).some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username,
      email,
      password,
      points: 0,
      achievements: []
    };

    users[newUser.id] = newUser;
    this.saveUsers(users);

    return this.sanitizeUser(newUser);
  }

  async deleteAccount(userId: string): Promise<void> {
    // Prevent deletion of test account
    if (userId === this.TEST_ACCOUNT.id) {
      throw new Error('Cannot delete test account');
    }
    
    const users = this.getUsers();
    delete users[userId];
    this.saveUsers(users);
    this.storage.removeItem(this.CURRENT_USER_KEY);
  }

  async signOut(): Promise<void> {
    this.storage.removeItem(this.CURRENT_USER_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const userJson = this.storage.getItem(this.CURRENT_USER_KEY);
    if (!userJson) return null;
    
    const user = JSON.parse(userJson);
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: User & { password?: string }): User {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}

export const authService = new AuthService();