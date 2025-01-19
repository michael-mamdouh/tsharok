import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Message {
  id: number;
  subject: string;
  body: string;
  sender: string;
  date: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Message[] = [
    {
      id: 1,
      subject: 'Welcome to our platform',
      body: 'Thank you for joining our platform. We hope you enjoy your experience!',
      sender: 'System Admin',
      date: new Date(),
      read: false
    },
    {
      id: 2,
      subject: 'New feature announcement',
      body: 'We have added new exciting features to our platform.',
      sender: 'Product Team',
      date: new Date(Date.now() - 86400000), // 1 day ago
      read: false
    }
  ];

  getMessages(): Observable<Message[]> {
    // Simulate API call with delay
    return of(this.messages).pipe(delay(1000));
  }

  getMessage(id: number): Observable<Message | undefined> {
    const message = this.messages.find(m => m.id === id);
    return of(message).pipe(delay(500));
  }
}