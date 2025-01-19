import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsService, NewsItem } from '../services/news.service';
import { TranslateComponent } from '../components/translate/translate.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateComponent
  ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];
  currentPage = 1;
  loading = false;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.newsService.getNews(this.currentPage).subscribe({
      next: (news) => {
        this.newsItems = [...this.newsItems, ...news];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadNews();
  }

  viewDetails(id: number) {
    this.router.navigate(['/news', id]);
  }
}