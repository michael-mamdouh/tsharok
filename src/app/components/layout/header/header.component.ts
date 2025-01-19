import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LanguageService } from '../../../services/language.service';
import { AuthService } from '../../../services/auth.service';
import { TranslateComponent } from '../../translate/translate.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    TranslateComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <div class="nav-links">
        <a mat-button routerLink="/"><app-translate key="nav.home"></app-translate></a>
        <a mat-button routerLink="/news"><app-translate key="nav.news"></app-translate></a>
        <a mat-button routerLink="/about"><app-translate key="nav.about"></app-translate></a>
      </div>
      <div class="actions">
        <div class="auth-buttons">
          <ng-container *ngIf="!isAuthenticated">
            <a mat-button routerLink="/login">
              <app-translate key="nav.login"></app-translate>
            </a>
            <a mat-raised-button color="accent" routerLink="/register">
              <app-translate key="nav.signup"></app-translate>
            </a>
          </ng-container>
          <ng-container *ngIf="isAuthenticated">
            <a mat-icon-button routerLink="/messages" matBadge="2" matBadgeColor="accent">
              <mat-icon>mail</mat-icon>
            </a>
            <a mat-raised-button 
               color="accent" 
               routerLink="/profile">
              <app-translate key="nav.profile"></app-translate>
            </a>
          </ng-container>
        </div>
        <div class="lang-switcher">
          <button mat-raised-button 
                  (click)="switchLanguage('en')" 
                  [color]="currentLang === 'en' ? 'accent' : ''">
            English
          </button>
          <button mat-raised-button 
                  (click)="switchLanguage('ar')" 
                  [color]="currentLang === 'ar' ? 'accent' : ''">
            عربي
          </button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentLang = 'en';
  isAuthenticated = false;

  constructor(
    public langService: LanguageService,
    private authService: AuthService
  ) {
    langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }

  async switchLanguage(lang: string) {
    await this.langService.setLanguage(lang);
  }
}