import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get('/api/patients');
  }

  getDoctors(): Observable<any> {
    return this.http.get('/api/doctors');
  }

  getAppointments(): Observable<any> {
    return this.http.get('/api/appointments');
  }

  addAppointment(data: any): Observable<any> {
    return this.http.post('/api/appointments', data);
  }

  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`/api/appointments/${id}`, data);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`/api/appointments/${id}`);
  }
}
