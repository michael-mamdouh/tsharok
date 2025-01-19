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

  async loadTranslations() {
    const response = await fetch(`/assets/i18n/${this.currentLang.value}.json`);
    this.translations = await response.json();
    this.updateDocumentDirection();
  }

  private updateDocumentDirection() {
    document.documentElement.lang = this.currentLang.value;
    document.documentElement.dir = this.currentLang.value === 'ar' ? 'rtl' : 'ltr';
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