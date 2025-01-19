import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../../components/translate/translate.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateComponent
  ],
  template: `
    <div class="auth-container-wrapper">
      <button mat-icon-button class="back-button" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      
      <div class="auth-container">
        <div class="container-fluid">
          <div class="row">
            <div class="col-5">
              <div class="auth-container__img-wrapper">
                <h1><app-translate key="auth.signup.welcomeTo"></app-translate></h1>
                <img src="../../../assets/images/auth-logo.png" alt="logo" />
              </div>
            </div>
            <div class="col-7">
              <div class="auth-container__form-wrapper">
                <h2><app-translate key="auth.signup.title"></app-translate></h2>
                <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                  <div class="form_item">
                    <label for="email">
                      <app-translate key="auth.signup.email"></app-translate>
                    </label>
                    <mat-form-field appearance="outline">
                      <mat-icon matPrefix>mail</mat-icon>
                      <input
                        matInput
                        type="email"
                        formControlName="email"
                        [placeholder]="getTranslatedText('auth.signup.emailPlaceholder')"
                      />
                      <mat-error *ngIf="signupForm.get('email')?.errors?.['required']">
                        <app-translate key="auth.signup.emailRequired"></app-translate>
                      </mat-error>
                      <mat-error *ngIf="signupForm.get('email')?.errors?.['email']">
                        <app-translate key="auth.signup.emailInvalid"></app-translate>
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form_item">
                    <label for="password">
                      <app-translate key="auth.signup.password"></app-translate>
                    </label>
                    <mat-form-field appearance="outline">
                      <mat-icon matPrefix>lock</mat-icon>
                      <input
                        matInput
                        type="password"
                        formControlName="password"
                        [placeholder]="getTranslatedText('auth.signup.passwordPlaceholder')"
                      />
                      <mat-error *ngIf="signupForm.get('password')?.errors?.['required']">
                        <app-translate key="auth.signup.passwordRequired"></app-translate>
                      </mat-error>
                      <mat-error *ngIf="signupForm.get('password')?.errors?.['minlength']">
                        <app-translate key="auth.signup.passwordMinLength"></app-translate>
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form_item">
                    <label for="confirmPassword">
                      <app-translate key="auth.signup.confirmPassword"></app-translate>
                    </label>
                    <mat-form-field appearance="outline">
                      <mat-icon matPrefix>lock</mat-icon>
                      <input
                        matInput
                        type="password"
                        formControlName="confirmPassword"
                        [placeholder]="getTranslatedText('auth.signup.confirmPasswordPlaceholder')"
                      />
                      <mat-error *ngIf="signupForm.get('confirmPassword')?.errors?.['required']">
                        <app-translate key="auth.signup.confirmPasswordRequired"></app-translate>
                      </mat-error>
                      <mat-error *ngIf="signupForm.errors?.['mismatch']">
                        <app-translate key="auth.signup.passwordsMismatch"></app-translate>
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <button mat-raised-button color="primary" type="submit" class="generic-submit-button">
                    <app-translate key="auth.signup.submit"></app-translate>
                  </button>

                  <div class="create-account-button">
                    <span>
                      <app-translate key="auth.signup.alreadyHaveAccount"></app-translate>
                      <a routerLink="/login">
                        <app-translate key="auth.signup.login"></app-translate>
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container-wrapper {
      background-color: #1976d2;
      position: relative;
      min-height: 100vh;
    }

    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      color: white;
      
      [dir="rtl"] & {
        left: auto;
        right: 20px;
      }
    }

    .auth-container {
      position: relative;
      z-index: 2;
      
      .auth-container__img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        min-height: calc(100vh - 32px);
        flex-direction: column;
      }

      .auth-container__form-wrapper {
        background-color: white;
        margin-top: 16px;
        margin-bottom: 16px;
        border-radius: 10px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
        display: flex;
        color: white;
        min-height: calc(100vh - 32px);
        flex-direction: column;
        padding: 60px 100px;
      }
    }

    h1 {
      font-weight: 900;
      font-size: 56px;
      margin-bottom: 44px;
    }

    h2 {
      color: #807D7E;
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 24px;
    }
  `]
})
export class SignupComponent {
  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  registrationType: string | null = null;
  name: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private langService: LanguageService,
    private location: Location
  ) {
    const state = history.state;
    this.registrationType = state.type;
    this.name = state.name;

    if (!this.registrationType || !this.name) {
      this.router.navigate(['/register']);
      return;
    }
  }

  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.router.navigate(['/otp'], { 
        state: { 
          email: this.signupForm.get('email')?.value,
          type: this.registrationType,
          name: this.name
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}