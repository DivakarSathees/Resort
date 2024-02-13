import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  addJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/job`, jobData);
  }

  getJobsByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/api/job/user/${userId}`);
  }

  updateJob(jobData: any): Observable<any> {
    const id = jobData.jobId;
    return this.http.put(`${this.apiUrl}/api/job/${id}`, jobData);
  }

  deleteJob(jobData: any): Observable<any> {
    const id = jobData.jobId;
    return this.http.delete(`${this.apiUrl}/api/job/${id}`);
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/job`);
  }

  getJobsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/job/${id}`);
  }

  searchJobsByUserId(searchValue: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/api/job/user/${userId}`, { params: {userId, searchValue }});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  searchJobs(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/job`, { params: { searchValue }});
  }

  sortJobs(sortValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/job`, { params: { sortValue }});
  }

}
