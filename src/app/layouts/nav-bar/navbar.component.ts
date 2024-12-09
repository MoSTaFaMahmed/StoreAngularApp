import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/utilites/translate.service';
import { AuthenticationService } from '@core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@core/models/user.model';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, MatMenuModule, MatIconModule, NgIf, AsyncPipe , MatButtonToggleModule],

  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  currentLang: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private translationService: TranslationService,
  ) {

    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
    this.currentLang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  toggleLanguage() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translationService.setLanguage(newLang);
    this.currentLang = newLang;
  }
}
