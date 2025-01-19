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
  selector: 'app-reset-password-otp',
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
            <app-translate key="auth.resetPasswordOtp.title"></app-translate>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p class="otp-message">
            <app-translate key="auth.resetPasswordOtp.message"></app-translate>
            <strong>{{ email }}</strong>
          </p>
          
          <form [formGroup]="otpForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>
                <app-translate key="auth.resetPasswordOtp.code"></app-translate>
              </mat-label>
              <input matInput type="text" formControlName="otp" maxlength="6">
              <mat-error *ngIf="otpForm.get('otp')?.errors?.['required']">
                <app-translate key="auth.resetPasswordOtp.required"></app-translate>
              </mat-error>
              <mat-error *ngIf="otpForm.get('otp')?.errors?.['minlength'] || otpForm.get('otp')?.errors?.['maxlength']">
                <app-translate key="auth.resetPasswordOtp.invalid"></app-translate>
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!otpForm.valid">
              <app-translate key="auth.resetPasswordOtp.verify"></app-translate>
            </button>
            
            <button mat-button type="button" (click)="resendOtp()">
              <app-translate key="auth.resetPasswordOtp.resend"></app-translate>
            </button>
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

      .otp-message {
        margin: 1rem 0;
        text-align: center;
        
        strong {
          display: block;
          margin-top: 0.5rem;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        mat-form-field {
          width: 100%;
          
          input {
            letter-spacing: 0.5em;
            text-align: center;
          }
        }

        button {
          width: 100%;
          
          &[type="button"] {
            margin-top: 0.5rem;
          }
        }
      }
    }
  `]
})
export class ResetPasswordOtpComponent {
  otpForm: FormGroup;
  email: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.email = history.state.email;
    if (!this.email) {
      this.router.navigate(['/forgot-password']);
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      // Here you would verify the OTP with your backend
      // For now, we'll just navigate to the reset password screen
      this.router.navigate(['/reset-password'], { 
        state: { 
          email: this.email,
          otp: this.otpForm.get('otp')?.value 
        }
      });
    }
  }

  resendOtp() {
    // Implement OTP resend logic here
    console.log('Resending OTP to:', this.email);
  }
}