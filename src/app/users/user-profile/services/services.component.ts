import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateComponent } from "../../../components/translate/translate.component";
import { BannerComponent } from "../../../home/banner/banner.component";
import { AuthService } from "../../../services/auth.service";
import { LanguageService } from "../../../services/language.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    TranslateComponent,
    BannerComponent,
  ],
  templateUrl: "./services.component.html",
  
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private langService: LanguageService
  ) {
    this.authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );
  }
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
}
