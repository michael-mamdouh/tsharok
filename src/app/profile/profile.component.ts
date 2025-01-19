import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, User } from '../services/auth.service';
import { TranslateComponent } from '../components/translate/translate.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateComponent
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar class="profile-avatar">
            <mat-icon>account_circle</mat-icon>
          </div>
          <mat-card-title>{{ user?.name }}</mat-card-title>
          <mat-card-subtitle>{{ user?.email }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="profile-info">
            <h2><app-translate key="profile.welcome"></app-translate></h2>
            <p><app-translate key="profile.description"></app-translate></p>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="warn" (click)="logout()">
            <app-translate key="profile.logout"></app-translate>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;

      mat-card {
        .profile-avatar {
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;

          mat-icon {
            font-size: 40px;
            width: 40px;
            height: 40px;
          }
        }

        .profile-info {
          margin: 2rem 0;
          
          h2 {
            margin-bottom: 1rem;
            color: #333;
          }

          p {
            color: #666;
          }
        }

        mat-card-actions {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  `]
})
export class ProfileComponent {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}