import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateComponent } from "../../../components/translate/translate.component";
import { LanguageService } from "../../../services/language.service";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    TranslateComponent,
    FormsModule,
  ],
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  searchValue: string = "";
  currentLanguage: string = "ar";
  private langSubscription!: Subscription;
  servicesBannerCards = [
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title1",
      link: "#1",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title2",
      link: "#",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title3",
      link: "#",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title4",
      link: "#",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title5",
      link: "#",
    },
  ];
  servicesCards = [
    {
      titleAr: "تجديد رخصة عمل",
      titleEn: "Title1",
      image: "https://picsum.photos/id/230/200/200",
      link: "#1",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title2",
      image: "https://picsum.photos/id/231/200/300",
      link: "#",
    },
    {
      titleAr: "إدارة حسابات التواصل",
      titleEn: "Title3",
      image: "https://picsum.photos/id/232/200/200",
      link: "#",
    },
    {
      titleAr: "التسويق الإلكتروني",
      titleEn: "Title4",
      image: "https://picsum.photos/id/233/200/200",
      link: "#",
    },
    {
      titleAr: "تجديد رخصة عمل",
      titleEn: "Title1",
      image: "https://picsum.photos/id/230/200/200",
      link: "#",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title2",
      image: "https://picsum.photos/id/231/200/300",
      link: "#",
    },
    {
      titleAr: "إدارة حسابات التواصل",
      titleEn: "Title3",
      image: "https://picsum.photos/id/232/200/200",
      link: "#",
    },
    {
      titleAr: "التسويق الإلكتروني",
      titleEn: "Title4",
      image: "https://picsum.photos/id/233/200/200",
      link: "#",
    },
    {
      titleAr: "تجديد رخصة عمل",
      titleEn: "Title1",
      image: "https://picsum.photos/id/230/200/200",
      link: "#",
    },
    {
      titleAr: "تصميم مواقع",
      titleEn: "Title2",
      image: "https://picsum.photos/id/231/200/300",
      link: "#",
    },
    {
      titleAr: "إدارة حسابات التواصل",
      titleEn: "Title3",
      image: "https://picsum.photos/id/232/200/200",
      link: "#",
    },
    {
      titleAr: "التسويق الإلكتروني",
      titleEn: "Title4",
      image: "https://picsum.photos/id/233/200/200",
      link: "#",
    },
  ];

  constructor(private langService: LanguageService, private router: Router) {}

  ngOnInit() {
    this.langSubscription = this.langService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  getDirectionClass(): string {
    return document.dir === "rtl" ? "rightDirection" : "leftDirection";
  }

  getTranslatedText(key: string): string {
    return TranslateComponent.translateValue(key, this.langService);
  }

  getTranslatedTitle(service: any) {
    return this.currentLanguage === "ar" ? service.titleAr : service.titleEn;
  }

  onSearch() {
    if (this.searchValue.trim()) {
      console.log("Navigate Here");
      this.router.navigate([`/user/searchListing/${this.searchValue.trim()}`]);
    }
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
