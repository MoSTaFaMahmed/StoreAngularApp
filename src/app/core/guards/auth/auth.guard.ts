import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@core/services/auth.service';
import { UserRole } from '@core/enums/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {

      if (state.url === '/') {
        const userRole = this.authService.getUser()?.role;
        if (userRole === UserRole.Admin) {

          this.router.navigate(['/admin-view']);
        } else {

          this.router.navigate(['/user-view']);
        }
        return false;
      }
    }


    if (!isLoggedIn && state.url !== '/') {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
