import { Component, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, Location } from "@angular/common";
import { TranslateComponent } from "../../components/translate/translate.component";
import { LanguageService } from "../../services/language.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  standalone:true,
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss","../login/login.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateComponent,
    MatIconModule,
  ],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private langService: LanguageService,
    private location: Location
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get("email")?.value;
      // Simulate API call and navigate
      this.router.navigate(["/reset-password-otp"], {
        state: { email: email },
      });
    }
  }
  goBack() {
    this.location.back();
  }
  getDirectionIcon(): string {
    return document.dir === "rtl" ? "arrow_forward" : "arrow_back";
  }
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
