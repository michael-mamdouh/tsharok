import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateComponent } from "../../../components/translate/translate.component";
import { LanguageService } from "../../../services/language.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    TranslateComponent,
    FormsModule
  ],
  templateUrl: "./services.component.html",
  
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent {
  isAuthenticated = false;
  searchValue: string = "";

  constructor(
    private langService: LanguageService,
    private router: Router
  ) {
    
  }
  getDirectionClass(): string {
    return document.dir === 'rtl' ? 'rightDirection' : 'leftDirection';
  }
  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }
  onSearch() {
    if (this.searchValue.trim()) {
      console.log("Navigate Here");
      this.router.navigate([`/user/searchListing/${this.searchValue.trim()}`]);
    }
  }
}
