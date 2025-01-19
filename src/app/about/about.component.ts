import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../services/language.service';
import { CounterService } from '../services/counter.service';
import { TranslateComponent } from '../components/translate/translate.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, TranslateComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(
    public langService: LanguageService,
    public counterService: CounterService
  ) {}

  incrementCounter() {
    this.counterService.increment();
  }
}