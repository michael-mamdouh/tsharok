import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RegistrationTypeComponent } from './auth/registration-type/registration-type.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordOtpComponent } from './auth/reset-password-otp/reset-password-otp.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './auth/reset-password-success/reset-password-success.component';
import { OtpComponent } from './auth/otp/otp.component';
import { OtpSuccessComponent } from './auth/otp-success/otp-success.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { ServicesComponent } from './users/user-profile/services/services.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'about', 
    component: AboutComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'news', 
    component: NewsComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'news/:id', 
    component: NewsDetailsComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'messages',
    component: MessagesComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'user', 
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
    ]
  },
  { 
    path: 'company', 
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: CompanyProfileComponent
      }
    ]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: 'register',
    component: RegistrationTypeComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'reset-password-otp', 
    component: ResetPasswordOtpComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'reset-password', 
    component: ResetPasswordComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'reset-password-success', 
    component: ResetPasswordSuccessComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'otp', 
    component: OtpComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'otp-success', 
    component: OtpSuccessComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];