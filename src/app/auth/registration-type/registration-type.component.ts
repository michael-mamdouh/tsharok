import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateComponent } from '../../components/translate/translate.component';
import { LanguageService } from '../../services/language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration-type',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateComponent,
    MatIconModule
  ],
  templateUrl: './registration-type.component.html',
  styleUrls: ['../login/login.component.scss', './registration-type.component.scss']
})
export class RegistrationTypeComponent {
  selectedType: 'company' | 'freelancer' | null = null;
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private langService: LanguageService,
    private location: Location
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  selectType(type: 'company' | 'freelancer') {
    this.selectedType = type;
  }

  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }

  getDirectionIcon(): string {
    return document.dir === 'rtl' ? 'arrow_forward' : 'arrow_back';
  }

  onSubmit() {
    if (this.registrationForm.valid && this.selectedType) {
      this.router.navigate(['/signup'], {
        state: {
          type: this.selectedType,
          name: this.registrationForm.get('name')?.value
        }
      });
    }
  }

  goBack() {
    this.location.back();
    // this.router.navigate(['/'])
  }
}