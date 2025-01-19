import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../../components/translate/translate.component';

@Component({
  selector: 'app-otp-success',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateComponent
  ],
  template: `
    <div class="success-container">
      <mat-card>
        <mat-card-content>
          <div class="success-icon">
            <mat-icon color="primary">check_circle</mat-icon>
          </div>
          <h2><app-translate key="auth.otpSuccess.title"></app-translate></h2>
          <p><app-translate key="auth.otpSuccess.message"></app-translate></p>
          <button mat-raised-button color="primary" (click)="goToLogin()">
            <app-translate key="auth.otpSuccess.loginButton"></app-translate>
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      mat-card {
        width: 100%;
        max-width: 400px;
        text-align: center;
      }

      .success-icon {
        margin: 2rem 0;
        
        mat-icon {
          font-size: 4rem;
          width: 4rem;
          height: 4rem;
        }
      }

      h2 {
        margin-bottom: 1rem;
        color: #333;
      }

      p {
        margin-bottom: 2rem;
        color: #666;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class OtpSuccessComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}