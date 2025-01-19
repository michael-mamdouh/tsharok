import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateComponent } from '../components/translate/translate.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    TranslateComponent
  ],
  template: `
    <div class="landing-container">
      <div class="welcome-text">
        <h1>أهلا بك في تشارك</h1>
      </div>
      
      <div class="options-container">
        <div class="registration-options">
          <div class="option-card" (click)="registerAs('company')">
            <img src="assets/images/company.png" alt="Company">
            <h3>شركة</h3>
          </div>
          
          <div class="option-card" (click)="registerAs('freelancer')">
            <img src="assets/images/freelancer.png" alt="Freelancer">
            <h3>موظف حر</h3>
          </div>
        </div>
        
        <button mat-raised-button color="primary" class="next-button">
          التالي
        </button>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      text-align: center;
      direction: rtl;
    }

    .welcome-text {
      margin-bottom: 3rem;
      
      h1 {
        color: #1976d2;
        font-size: 2.5rem;
      }
    }

    .options-container {
      max-width: 600px;
      width: 100%;
    }

    .registration-options {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .option-card {
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

      img {
        width: 120px;
        height: 120px;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0;
        color: #333;
      }
    }

    .next-button {
      width: 200px;
      padding: 0.8rem;
      font-size: 1.1rem;
    }
  `]
})
export class LandingComponent {
  constructor(private router: Router) {}

  registerAs(type: 'company' | 'freelancer') {
    // Handle registration type selection
    console.log(`Selected registration type: ${type}`);
    // You can navigate to specific registration forms based on the type
    // this.router.navigate([`/register/${type}`]);
  }
}