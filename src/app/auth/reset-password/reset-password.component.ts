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
  selector: 'app-reset-password',
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
            <app-translate key="auth.resetPassword.title"></app-translate>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>
                <app-translate key="auth.resetPassword.newPassword"></app-translate>
              </mat-label>
              <input matInput type="password" formControlName="password">
              <mat-error *ngIf="resetPasswordForm.get('password')?.errors?.['required']">
                <app-translate key="auth.resetPassword.passwordRequired"></app-translate>
              </mat-error>
              <mat-error *ngIf="resetPasswordForm.get('password')?.errors?.['minlength']">
                <app-translate key="auth.resetPassword.passwordMinLength"></app-translate>
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>
                <app-translate key="auth.resetPassword.confirmPassword"></app-translate>
              </mat-label>
              <input matInput type="password" formControlName="confirmPassword">
              <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.errors?.['required']">
                <app-translate key="auth.resetPassword.confirmPasswordRequired"></app-translate>
              </mat-error>
              <mat-error *ngIf="resetPasswordForm.errors?.['mismatch']">
                <app-translate key="auth.resetPassword.passwordsMismatch"></app-translate>
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!resetPasswordForm.valid">
              <app-translate key="auth.resetPassword.submit"></app-translate>
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
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  email: string | null;
  otp: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.email = history.state.email;
    this.otp = history.state.otp;
    
    if (!this.email || !this.otp) {
      this.router.navigate(['/forgot-password']);
    }

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      // Here you would make an API call to reset the password
      // For now, we'll just navigate to the success screen
      this.router.navigate(['/reset-password-success']);
    }
  }
}