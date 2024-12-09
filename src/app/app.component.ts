import { Component } from '@angular/core';
import { TranslationService } from './core/services/utilites/translate.service';

import { locale as enLang } from '@assets/i18n/en'
import { locale as arLang } from '@assets/i18n/ar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store-angular-app';

  constructor(private translationService : TranslationService){
    this.translationService.loadTranslations(arLang, enLang);
  }

  ngOnInit(): void {
    this.translationService.setLanguage(
      this.translationService.getSelectedLanguage()
    );

  }

}
