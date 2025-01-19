import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NewsService, NewsItem } from '../../services/news.service';
import { TranslateComponent } from '../../components/translate/translate.component';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TranslateComponent
  ],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  newsItem: NewsItem | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNewsItem(parseInt(id, 10));
    }
  }

  loadNewsItem(id: number) {
    this.loading = true;
    this.newsService.getNewsItem(id).subscribe({
      next: (item) => {
        this.newsItem = item;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/news']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/news']);
  }
}