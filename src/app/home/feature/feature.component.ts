import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateComponent } from "../../components/translate/translate.component";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: "app-feature",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    TranslateComponent,
  ],
  templateUrl: "./feature.component.html",
  styleUrls: ["./feature.component.scss"],
})
export class FeatureComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() buttonText!: string;
  @Input() buttonLink!: string;
  @Input() imgPosition!: string;

  constructor(private langService: LanguageService) {}
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
}
