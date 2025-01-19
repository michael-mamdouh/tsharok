import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private pageSize = 10;

  constructor(private http: HttpClient) {}

  getNews(page: number): Observable<NewsItem[]> {
    const start = (page - 1) * this.pageSize;
    return this.http.get<NewsItem[]>(`${this.baseUrl}/posts?_start=${start}&_limit=${this.pageSize}`);
  }

  getNewsItem(id: number): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.baseUrl}/posts/${id}`);
  }
}