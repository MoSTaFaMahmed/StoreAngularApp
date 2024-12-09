import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@core/models/user.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm !: FormGroup;
  users: User[] = [
    { username: 'user', password: 'user', role: 'User' },
    { username: 'admin', password: 'admin', role: 'Admin' },
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private translateService :TranslateService

  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));

      this.authService.login(user);
      this.router.navigate([user.role === 'Admin' ? '/admin-view' : '/user-view']);
    } else {
      this.SnackBar(this.translateService.instant('Login.invalidCredentials'));
    }
  }

  SnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
      panelClass: ['white-snackbar']
    });
  }
}
