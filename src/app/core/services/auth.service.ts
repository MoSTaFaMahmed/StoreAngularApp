import { Injectable } from "@angular/core";
import { User } from "@core/models/user.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this._isLoggedInSubject.asObservable();

  private _userSubject = new BehaviorSubject<User | null>(this.getUser());
  public user$ = this._userSubject.asObservable();

  constructor() {}

  login(data: User): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(data));
    this._userSubject.next(data);
    this._isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this._userSubject.next(null);
    this._isLoggedInSubject.next(false);

    console.log('User logged out');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
