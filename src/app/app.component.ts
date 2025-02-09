import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { CommonModule } from "@angular/common"; // Import CommonModule
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    MatIconModule,
    FooterComponent,
  ],
  template: `
    <ng-container *ngIf="showHeader">
      <app-header></app-header>
    </ng-container>
    <router-outlet></router-outlet>
    <ng-container *ngIf="showHeader">
      <app-footer></app-footer>
    </ng-container>
  `,
  styles: [],
})
export class AppComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // const currentRoute = this.router.url;
      const excludeFromHeader =
        window.location.href.includes("/login") ||
        window.location.href.includes("/register") ||
        window.location.href.includes("/signup") ||
        window.location.href.includes("/otp") ||
        window.location.href.includes("/forgot-password") ||
        window.location.href.includes("/reset-password")
        
        this.showHeader = !excludeFromHeader; // Hide header on login page
    });
  }
}
