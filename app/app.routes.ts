// app.routes.ts

import { Routes } from '@angular/router';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full',
    },
    {
        path: 'appointments',
        component: AppointmentsComponent,
    },
    {
        path: 'doctors',
        component: DoctorsComponent,
    },
    {
        path: 'patients',
        component: PatientsComponent,
    },
];
