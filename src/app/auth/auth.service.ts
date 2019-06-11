import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: AuthData[] = [];
  private usersUpdated = new Subject<AuthData[]>();
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private username: string;
  private role: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.username;
  }

  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, email: string, role: string, password: string) {
    const authData: AuthData = {
      username: username,
      email: email,
      role: role,
      password: password
    };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  login(email: string, password: string) {
    // const authData: AuthData = ;
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        role: string;
        username: string;
      }>('http://localhost:3000/api/user/login', {
        email: email,
        password: password
      })
      .subscribe((res) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = res.userId;
          this.role = res.role;
          this.username = res.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.role,
            this.username
          );
        }
      });
    if (this.role == 'Creator') {
      this.router.navigate(['/creators/content']);
    } else if (this.role == 'Narrator') {
      this.router.navigate(['/narrators']);
    } else if (this.role == 'Production') {
      this.router.navigate(['/productions']);
    } else {
      this.router.navigate(['admin']);
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.role = authInformation.role;
      this.username = authInformation.username;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    // this.role = null;
    this.username = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    role: string,
    username: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role,
      username: username
    };
  }

  getUsers() {
    return this.http.get<AuthData[]>('http://localhost:3000/api/user');
  }
}
