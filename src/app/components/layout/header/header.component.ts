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
  templateUrl: './header.component.html',
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