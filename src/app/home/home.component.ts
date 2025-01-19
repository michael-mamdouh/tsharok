import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../components/translate/translate.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    MatButtonModule,
    MatIconModule,
    TranslateComponent
  ],
  template: `
    <div class="container">
      <h1><app-translate key="home.title"></app-translate></h1>
      <p><app-translate key="home.description"></app-translate></p>
      
      <div class="button-container">
        <a mat-raised-button color="primary" routerLink="/news">
          <app-translate key="nav.news"></app-translate>  
        </a>
        <a mat-raised-button color="primary" routerLink="/about">
          <app-translate key="nav.about"></app-translate>
        </a>
        
        <ng-container *ngIf="!isAuthenticated">
          <a mat-raised-button color="accent" routerLink="/login">
            <app-translate key="nav.login"></app-translate>
          </a>
          <a mat-raised-button color="primary" routerLink="/register">
            <app-translate key="nav.signup"></app-translate>
          </a>
        </ng-container>
        
        <ng-container *ngIf="isAuthenticated">
          <a mat-raised-button color="accent" routerLink="/messages">
            <mat-icon>mail</mat-icon>
            <app-translate key="nav.messages"></app-translate>
          </a>
          <a mat-raised-button color="primary" routerLink="/users/profile">
            <mat-icon>person</mat-icon>
            <app-translate key="nav.userProfile"></app-translate>
          </a>
          <a mat-raised-button color="primary" routerLink="/company/profile">
            <mat-icon>business</mat-icon>
            <app-translate key="nav.companyProfile"></app-translate>
          </a>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }
}