import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiUrl } from 'src/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  public apiUrl = apiUrl; 
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$: Observable<string> = this.userRoleSubject.asObservable();
 private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(username: string, password: string, userRole: string, email: string, mobileNumber:string): Observable<any> {
    const body = { username, password, userRole, email, mobileNumber };
    console.log(body);

    return this.http.post<any>(`${this.apiUrl}/api/register`, body).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  isLoggedIn(): boolean {
    console.log(localStorage.getItem('userId'));

    return !!localStorage.getItem('userId');
  }

  getUserRole(): any {
    const role = localStorage.getItem('userRole');
    return role?.toString;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Handle the error (you can log it or perform other actions)
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    console.log(loginData);
    return this.http.post<any>(`${this.apiUrl}/api/login`, loginData)
      .pipe(
        tap((response: any) => {
          console.log(response);
          // Store the token in localStorage or a more secure storage method
          //localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', response.username);
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('userId', response.id);
          

          console.log(localStorage.getItem('userRole'));
          this.userRoleSubject.next(response.role);
          this.isAuthenticatedSubject.next(true); // Notify observers that the user is authenticate

        })
      );
  }

  logout(): void {
    // Remove the token from storage upon logout
    //localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('studentId');
    localStorage.removeItem('admissionId');

    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by verifying the token
    const token = localStorage.getItem('userId');
    console.log(token);

    return !!token; // Return true if the token exists
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('userRole');
      if(role === 'admin' || role === 'ADMIN'){
        return true;
      }
    
    return false; 
  }

  isCustomer(): boolean {

    const role = localStorage.getItem('userRole');
    
      if(role === 'customer' || role === 'CUSTOMER'){
        return true;
      }
    return false; 
  }
}
