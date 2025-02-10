import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";
import { TranslateComponent } from "../../components/translate/translate.component";

@Component({
  selector: "app-generic-title-description",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./generic-title-description.component.html",
  styleUrls: ["./generic-title-description.component.scss"],
})
export class GenericTitleDescriptionComponent {
  @Input() title!: string;
  @Input() description!: string;
  constructor(private langService: LanguageService) {}
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
}
