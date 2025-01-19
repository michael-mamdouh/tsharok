import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateComponent } from '../components/translate/translate.component';
import { MessagesService, Message } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    TranslateComponent
  ],
  template: `
    <div class="messages-container">
      <h1><app-translate key="messages.title"></app-translate></h1>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p><app-translate key="messages.loading"></app-translate></p>
      </div>

      <mat-card *ngIf="!loading">
        <mat-list>
          <mat-list-item *ngFor="let message of messages">
            <div matListItemTitle>{{ message.subject }}</div>
            <div matListItemLine>
              <app-translate key="messages.from"></app-translate>: {{ message.sender }}
            </div>
            <div matListItemLine>
              <app-translate key="messages.date"></app-translate>: {{ message.date | date }}
            </div>
            <mat-divider></mat-divider>
          </mat-list-item>

          <div *ngIf="messages.length === 0" class="no-messages">
            <mat-icon>inbox</mat-icon>
            <p><app-translate key="messages.noMessages"></app-translate></p>
          </div>
        </mat-list>
      </mat-card>
    </div>
  `,
  styles: [`
    .messages-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;

      h1 {
        color: #333;
        margin-bottom: 20px;
      }
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      gap: 1rem;

      p {
        color: #666;
      }
    }

    mat-list-item {
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      [matListItemTitle] {
        font-weight: 500;
      }

      [matListItemLine] {
        color: #666;
      }
    }

    .no-messages {
      text-align: center;
      padding: 2rem;
      color: #666;

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 1rem;
      }
    }
  `]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  loading = true;

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messagesService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}