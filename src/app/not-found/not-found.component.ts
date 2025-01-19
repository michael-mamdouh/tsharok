import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateComponent } from '../components/translate/translate.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule, TranslateComponent],
  template: `
    <div class="container text-center mt-5">
      <h1 class="display-1">404</h1>
      <h2><app-translate key="notFound.title"></app-translate></h2>
      <p><app-translate key="notFound.description"></app-translate></p>
      <a mat-raised-button color="primary" routerLink="/">
        <app-translate key="notFound.backHome"></app-translate>
      </a>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {}