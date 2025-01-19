import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly VALID_EMAIL = 'admin@mail.com';
  private readonly VALID_PASSWORD = '123456';
  private readonly AUTH_COOKIE_NAME = 'auth_token';
  private readonly TOKEN_EXPIRY_DAYS = 7;

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private generateAuthToken(): string {
    // Generate a simple token with timestamp and random string
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}.${random}`;
  }

  private setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    document.cookie = cookie;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  }

  private deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  login(email: string, password: string): { success: boolean; message?: string } {
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      const user: User = {
        email: email,
        name: 'Admin User'
      };
      
      // Generate and store auth token
      const token = this.generateAuthToken();
      this.setCookie(this.AUTH_COOKIE_NAME, token, this.TOKEN_EXPIRY_DAYS);
      
      // Store user data
      this.setCookie('user_data', JSON.stringify(user), this.TOKEN_EXPIRY_DAYS);
      
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      
      return { success: true };
    }
    return { 
      success: false, 
      message: 'Invalid email or password'
    };
  }

  logout() {
    this.deleteCookie(this.AUTH_COOKIE_NAME);
    this.deleteCookie('user_data');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private checkAuthStatus(): boolean {
    const token = this.getCookie(this.AUTH_COOKIE_NAME);
    const userData = this.getCookie('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        return true;
      } catch (e) {
        this.logout(); // Clear invalid data
        return false;
      }
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}