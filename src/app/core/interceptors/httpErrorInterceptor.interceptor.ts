import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpStatus } from '@core/enums/httpErors';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        // Use the HttpStatus enum to check for specific HTTP status codes
        switch (error.status) {
          case HttpStatus.NetworkError:
            this.translate.get('ErrorMessages.network').subscribe((res: string) => {
              errorMessage = res;
            });
            break;
          case HttpStatus.BadRequest:
            this.translate.get('ErrorMessages.badRequest').subscribe((res: string) => {
              errorMessage = res;
            });
            break;
          case HttpStatus.NotFound:
            this.translate.get('ErrorMessages.notFound').subscribe((res: string) => {
              errorMessage = res;
            });
            break;
          case HttpStatus.ServerError:
            this.translate.get('ErrorMessages.serverError').subscribe((res: string) => {
              errorMessage = res;
            });
            break;
          case HttpStatus.Unauthorized:
            this.router.navigate(['/']);
            break;
          default:
            this.translate.get('ErrorMessages.genericError').subscribe((res: string) => {
              errorMessage = `${res}: ${error.message}`;
            });
            break;
        }


        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
