import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addTeam(teamData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/team`, teamData);
  }


  getAllTeams(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/team`);
  }


  // getJobsByUserId(): Observable<any> {
  //   const userId = localStorage.getItem('userId');
  //   return this.http.get<any>(`${this.apiUrl}/api/team/user/${userId}`);
  // }

  updateTeam(teamData: any): Observable<any> {
    console.log("teamData",teamData)
    const id = teamData.TeamId;
    return this.http.put(`${this.apiUrl}/api/team/${id}`, teamData);
  }

  deleteTeam(teamData: any): Observable<any> {
    const id = teamData.TeamId;
    return this.http.delete(`${this.apiUrl}/api/team/${id}`);
  }


  getTeamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/team/${id}`);
  }

  // getAllUsers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/users`);
  // }}}
}