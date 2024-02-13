// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  getAllUsers(): Observable<any> {
    const authToken = localStorage.getItem('token');
    // console.log(authToken);

    // Set up headers with authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    });

    return this.http.get(`${this.apiUrl}/api/users`, {headers});
  }
}
