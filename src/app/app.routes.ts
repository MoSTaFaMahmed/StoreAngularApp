import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UserViewComponent } from './features/user/user-view-page/user-view.component';

import { NgModule } from '@angular/core';
import { AuthenticationGuard } from '@core/guards/auth/auth.guard';
import { RoleGuard } from '@core/guards/auth/role.guard';
import { AdminViewComponent } from './features/admin/admin-view-page/admin-view.component';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'user-view', component: UserViewComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { role: 'User' } },
  { path: 'admin-view', component: AdminViewComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { role: 'Admin' } },
  {
    path: '**',component : NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
