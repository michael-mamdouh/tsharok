import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateComponent } from '../../components/translate/translate.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateComponent
  ],
  template: `
    <div class="auth-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <app-translate key="auth.forgotPassword.title"></app-translate>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p class="description">
            <app-translate key="auth.forgotPassword.description"></app-translate>
          </p>
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>
                <app-translate key="auth.forgotPassword.email"></app-translate>
              </mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="forgotPasswordForm.get('email')?.errors?.['required']">
                <app-translate key="auth.forgotPassword.emailRequired"></app-translate>
              </mat-error>
              <mat-error *ngIf="forgotPasswordForm.get('email')?.errors?.['email']">
                <app-translate key="auth.forgotPassword.emailInvalid"></app-translate>
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!forgotPasswordForm.valid">
              <app-translate key="auth.forgotPassword.submit"></app-translate>
            </button>

            <a mat-button routerLink="/login">
              <app-translate key="auth.forgotPassword.backToLogin"></app-translate>
            </a>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      mat-card {
        width: 100%;
        max-width: 400px;
      }

      .description {
        margin: 1rem 0;
        color: #666;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        mat-form-field {
          width: 100%;
        }

        button {
          width: 100%;
        }
      }
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      // Here you would typically make an API call to request password reset
      // For now, we'll just navigate to the reset password OTP screen
      this.router.navigate(['/reset-password-otp'], { 
        state: { email: email }
      });
    }
  }
}