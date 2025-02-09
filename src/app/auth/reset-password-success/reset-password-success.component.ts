import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../../components/translate/translate.component';

@Component({
  selector: 'app-reset-password-success',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateComponent
  ],
  templateUrl: './reset-password-success.component.html',
  styleUrls: ["../login/login.component.scss", "../otp-success/otp-success.component.scss"]
  // template: `
  //   <div class="success-container">
  //     <mat-card>
  //       <mat-card-content>
  //         <div class="success-icon">
  //           <mat-icon color="primary">check_circle</mat-icon>
  //         </div>
  //         <h2>
  //           <app-translate key="auth.resetPasswordSuccess.title"></app-translate>
  //         </h2>
  //         <p>
  //           <app-translate key="auth.resetPasswordSuccess.message"></app-translate>
  //         </p>
  //         <button mat-raised-button color="primary" (click)="goToLogin()">
  //           <app-translate key="auth.resetPasswordSuccess.loginButton"></app-translate>
  //         </button>
  //       </mat-card-content>
  //     </mat-card>
  //   </div>
  // `
})
export class ResetPasswordSuccessComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}