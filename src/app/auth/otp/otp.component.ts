import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../../components/translate/translate.component';
import { LanguageService } from '../../services/language.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrls: ['./otp.component.scss', '../login/login.component.scss']
})
export class OtpComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  email: string | null;
  otpInputs: FormGroup;
  resendDisabled = true;
  timeLeft = 60;
  timerSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private langService: LanguageService,
    private location: Location,
    private snackBar: MatSnackBar,
    
  ) {
    this.email = history.state.email;
    if (!this.email) {
      this.router.navigate(['/signup']);
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    // Create form controls for each OTP digit
    this.otpInputs = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit6: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  ngOnInit() {
    this.startResendTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startResendTimer() {
    this.resendDisabled = true;
    this.timeLeft = 60;
    
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000)
      .pipe(take(61))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.resendDisabled = false;
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
        }
      });
  }

  onDigitInput(event: any, nextInput?: HTMLInputElement, prevInput?: HTMLInputElement) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (event.target.value.length === 0 && prevInput) {
      prevInput.focus();
    }

    // Combine all digits
    const digits = Object.values(this.otpInputs.value).join('');
    this.otpForm.get('otp')?.setValue(digits);
  }

  getDirectionIcon(): string {
    return document.dir === 'rtl' ? 'arrow_forward' : 'arrow_back';
  }

  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP submitted:', this.otpForm.value);
      this.router.navigate(['/otp-success']);
    }else{
      this.snackBar.open(this.getTranslatedText('auth.otp.otpExpired'), 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  resendOtp() {
    console.log('Resending OTP to:', this.email);
    this.startResendTimer();
  }

  goBack() {
    this.location.back();
  }
}