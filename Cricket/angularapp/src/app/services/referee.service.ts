import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class RefereeService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addReferee(refereeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/referee`, refereeData);
  }


  getAllReferees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/referee`);
  }


  // getJobsByUserId(): Observable<any> {
  //   const userId = localStorage.getItem('userId');
  //   return this.http.get<any>(`${this.apiUrl}/api/referee/user/${userId}`);
  // }

  updateReferee(refereeData: any): Observable<any> {
    const id = refereeData.RefereeID;
    return this.http.put(`${this.apiUrl}/api/referee/${id}`, refereeData);
  }

  deleteReferee(refereeData: any): Observable<any> {
    const id = refereeData.RefereeID;
    return this.http.delete(`${this.apiUrl}/api/referee/${id}`);
  }


  getRefereeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/referee/${id}`);
  }

  // getAllUsers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/users`);
  // }}
}