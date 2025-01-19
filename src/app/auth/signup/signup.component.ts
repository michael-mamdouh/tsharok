import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateComponent } from '../../components/translate/translate.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    TranslateComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]]
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

  getDirectionIcon(): string {
    return document.dir === 'rtl' ? 'arrow_forward' : 'arrow_back';
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

  loginWithGoogle() {
    // Implement Google login logic here
    console.log('Google login clicked');
  }

  goBack() {
    this.location.back();
  }
}