import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_COOKIE_NAME = 'preferred_language';
  private readonly DEFAULT_LANG = 'ar';
  private currentLang = new BehaviorSubject<string>(this.getInitialLanguage());
  currentLang$ = this.currentLang.asObservable();
  translations: { [key: string]: any } = {};

  constructor() {
    this.loadTranslations();
  }

  private getInitialLanguage(): string {
    const savedLang = this.getCookie(this.LANG_COOKIE_NAME);
    return savedLang || this.DEFAULT_LANG;
  }

  private setCookie(name: string, value: string, days: number = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  }

  private loadBootstrapCSS(isRTL: boolean) {
    // Remove existing Bootstrap CSS
    const existingLink = document.head.querySelector('link[data-bootstrap-css]');
    if (existingLink) {
      existingLink.remove();
    }

    // Create new link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-bootstrap-css', 'true');
    link.href = isRTL 
      ? '/assets/css/bootstrap/bootstrap.rtl.min.css'
      : '/assets/css/bootstrap/bootstrap.min.css';

    // Add new link to head
    document.head.appendChild(link);
  }

  async loadTranslations() {
    const response = await fetch(`/assets/i18n/${this.currentLang.value}.json`);
    this.translations = await response.json();
    this.updateDocumentDirection();
  }

  private updateDocumentDirection() {
    const isRTL = this.currentLang.value === 'ar';
    document.documentElement.lang = this.currentLang.value;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    this.loadBootstrapCSS(isRTL);
  }

  async setLanguage(lang: string) {
    this.currentLang.next(lang);
    this.setCookie(this.LANG_COOKIE_NAME, lang);
    await this.loadTranslations();
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }
}