import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: string[] = [];
  currentLang: BehaviorSubject<string> = new BehaviorSubject('ar');

  constructor(private translate: TranslateService) {
    const defaultLang = this.getSelectedLanguage() || 'ar';
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(defaultLang);
    this.setLanguage(defaultLang);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.handleLangChange(event.lang);
    });
  }

  loadTranslations(...locales: { lang: string; data: object }[]): void {
    locales.forEach(locale => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      if (!this.langIds.includes(locale.lang)) {
        this.langIds.push(locale.lang);
      }
    });

    this.translate.addLangs(this.langIds);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.handleLangChange(lang);
  }

  getSelectedLanguage(): string {
    return localStorage.getItem('language') || this.translate.getDefaultLang();
  }

  private handleLangChange(lang: string): void {
    this.currentLang.next(lang);

    const html = document.documentElement;
    const direction = lang === 'ar' ? 'rtl' : 'ltr';

    html.lang = lang;
    html.dir = direction;
    html.style.direction = direction;

    document.body.style.textAlign = lang === 'ar' ? 'right' : 'left';
  }
}
