import { Component } from '@angular/core';
import { CommonModule ,Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateComponent } from '../../components/translate/translate.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateComponent,
    MatIconModule
  ],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss','../login/login.component.scss']
})
export class OtpComponent {
  otpForm: FormGroup;
  email: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.email = history.state.email;
    if (!this.email) {
      this.router.navigate(['/signup']);
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }
  getDirectionIcon(): string {
    return document.dir === 'rtl' ? 'arrow_forward' : 'arrow_back';
  }
  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP submitted:', this.otpForm.value);
      // Here you would verify the OTP with your backend
      // For now, we'll just redirect to success page
      this.router.navigate(['/otp-success']);
    }
  }

  resendOtp() {
    console.log('Resending OTP to:', this.email);
    // Implement OTP resend logic here
  }
  goBack() {
    this.location.back();
  }
}