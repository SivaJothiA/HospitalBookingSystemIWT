// src/app/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getPatients(): Observable<any> {
        return this.http.get<any>
        ('http://localhost:4000/api/patient/get');
    }

    addPatient(data: any): Observable<any> {
        return this.http.post<any> 
        ('http://localhost:4000/api/patient/add', data);
    }

    updatePatient(id: string, data: any): Observable<any> {
        return this.http.put<any>(
            'http://localhost:4000/api/patient/update/' + id,
            data
        );
    }

    deletePatient(id: string): Observable<any> {
        return this.http.delete<any>(
            'http://localhost:4000/api/patient/delete/' + id
        );
    }

    getDoctors(): Observable<any> {
        return this.http.get<any>('http://localhost:4000/api/doctor/get');
    }

    addDoctor(data: any): Observable<any> {
        return this.http.post<any>('http://localhost:4000/api/doctor/add', data);
    }

    updateDoctor(id: string, data: any): Observable<any> {
        return this.http.put<any>(
            'http://localhost:4000/api/doctor/update/' + id,
            data
        );
    }

    deleteDoctor(id: string): Observable<any> {
        return this.http.delete<any>(
            'http://localhost:4000/api/doctor/delete/' + id
        );
    }

    getAppointments(): Observable<any> {
        return this.http.get<any>
        ('http://localhost:4000/api/appointment/get');
    }

    addAppointment(data: any): Observable<any> {
        return this.http.post<any>(
            'http://localhost:4000/api/appointment/add',
            data
        );
    }

    updateAppointment(id: string, data: any): Observable<any> {
        return this.http.put<any>(
            'http://localhost:4000/api/appointment/update/' + id,
            data
        );
    }

    deleteAppointment(id: string): Observable<any> {
        return this.http.delete<any>(
            'http://localhost:4000/api/appointment/delete/' + id
        );
    }
}
