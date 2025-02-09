import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateComponent } from "../../components/translate/translate.component";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    TranslateComponent,
  ],
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"],
})
export class BannerComponent {
  constructor(private langService: LanguageService) {}
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
}
