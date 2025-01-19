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
  template: `
    <div class="registration-type-container">
      <button mat-icon-button class="back-button" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      
      <div class="content-wrapper">
        <h1><app-translate key="auth.registrationType.title"></app-translate></h1>
        
        <div class="type-buttons">
          <div class="type-card" [class.selected]="selectedType === 'company'" (click)="selectType('company')">
            <img src="assets/images/company.png" alt="Company">
            <h3><app-translate key="auth.registrationType.company"></app-translate></h3>
          </div>
          
          <div class="type-card" [class.selected]="selectedType === 'freelancer'" (click)="selectType('freelancer')">
            <img src="assets/images/freelancer.png" alt="Freelancer">
            <h3><app-translate key="auth.registrationType.freelancer"></app-translate></h3>
          </div>
        </div>

        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>
              <app-translate key="auth.registrationType.name"></app-translate>
            </mat-label>
            <input 
              matInput 
              formControlName="name"
              [placeholder]="getTranslatedText('auth.registrationType.namePlaceholder')"
            >
            <mat-error *ngIf="registrationForm.get('name')?.errors?.['required']">
              <app-translate key="auth.registrationType.nameRequired"></app-translate>
            </mat-error>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            type="submit"
            [disabled]="!registrationForm.valid || !selectedType"
            class="next-button"
          >
            <app-translate key="auth.registrationType.next"></app-translate>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .registration-type-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      background-color: #f5f5f5;
      position: relative;
    }

    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      
      [dir="rtl"] & {
        left: auto;
        right: 20px;
      }
    }

    .content-wrapper {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 600px;
      width: 100%;
      text-align: center;

      h1 {
        color: #333;
        margin-bottom: 2rem;
      }
    }

    .type-buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .type-card {
      cursor: pointer;
      padding: 1.5rem;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
      transition: all 0.3s ease;
      width: 200px;

      &:hover {
        border-color: #1976d2;
        transform: translateY(-5px);
      }

      &.selected {
        border-color: #1976d2;
        background-color: #e3f2fd;
      }

      img {
        width: 80px;
        height: 80px;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0;
        color: #333;
      }
    }

    form {
      max-width: 400px;
      margin: 0 auto;

      mat-form-field {
        width: 100%;
        margin-bottom: 1rem;
      }
    }

    .next-button {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
      margin-top: 1rem;
    }
  `]
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
  }
}