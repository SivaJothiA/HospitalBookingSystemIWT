import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/api';

  // Patient methods
  getPatients() {
    return this.http.get(`${this.apiUrl}/patients/`);
  }

  addPatient(patient: any) {
    return this.http.post(`${this.apiUrl}/patients/`, patient);
  }

  updatePatient(id: string, patient: any) {
    return this.http.put(`${this.apiUrl}/patients/${id}`, patient);
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.apiUrl}/patients/${id}`);
  }
}
