import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserRole } from '@core/enums/userRole';
import { AuthenticationService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getUser()?.role;

    if (isLoggedIn) {
      const userRole = this.authService.getUser()?.role;
      if (next.data['role'] && next.data['role'] !== role) {
        if (userRole === UserRole.Admin) {
          this.router.navigate(['/admin-view']);
        } else {
          this.router.navigate(['/user-view']);
        }
        return false;
      }
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
