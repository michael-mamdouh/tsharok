import { Component, Input } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-translate',
  standalone: true,
  template: '{{ translatedText }}',
})
export class TranslateComponent {
  @Input() key: string = '';
  
  constructor(private langService: LanguageService) {}

  get translatedText(): string {
    return this.langService.translate(this.key);
  }

  static translateValue(key: string, langService: LanguageService): string {
    return langService.translate(key);
  }
}