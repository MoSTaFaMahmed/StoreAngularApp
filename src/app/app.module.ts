import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { TranslationService } from './core/services/utilites/translate.service';
import { NavBarComponent } from './layouts/nav-bar/navbar.component';
import { UserViewComponent } from './features/user/user-view-page/user-view.component';
import { AppRoutingModule } from './app.routes';
import { AdminViewComponent } from './features/admin/admin-view-page/admin-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from '@core/interceptors/httpErrorInterceptor.interceptor';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    LoginComponent,
    UserViewComponent,
    AdminViewComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  providers: [
    TranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
