import { Component, signal } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TranslateComponent } from "../../components/translate/translate.component";
import { LanguageService } from "../../services/language.service";
import { MatSnackBar } from "@angular/material/snack-bar";
// @Component({

@Component({
  selector: "app-reset-password",
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
    TranslateComponent,
  ],
  templateUrl: "./reset-password.component.html",
  styleUrls: [
    "../login/login.component.scss",
    "../registration-type/registration-type.component.scss",
    "../signup/signup.component.scss",
  ],
})
export class ResetPasswordComponent {
  hide = signal(true);
  hideConfirmPassword = signal(true);
  resetPasswordForm: FormGroup;
  email: string | null;
  otp: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private langService: LanguageService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    const state = history.state;
    this.email = history.state.email;
    this.otp = history.state.otp;

    if (!this.email || !this.otp) {
      alert("Invalid reset password link");
      this.router.navigate(["/forgot-password"]);
    }

    this.resetPasswordForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password")?.value === g.get("confirmPassword")?.value
      ? null
      : { mismatch: true };
  }

  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
  getDirectionIcon(): string {
    return document.dir === "rtl" ? "arrow_forward" : "arrow_back";
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  confirmPasswordClick(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
  goBack() {
    this.location.back();
  }
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.router.navigate(["/reset-password-success"]);
    } else {
      if (
        this.resetPasswordForm.get("password")?.value !==
        this.resetPasswordForm.get("confirmPassword")?.value
      ) {
        this.snackBar.open(
          this.getTranslatedText("auth.signup.passwordsMismatch"),
          this.getTranslatedText("layout.global.close"),
          {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
          }
        );
      }
    }
  }
}
