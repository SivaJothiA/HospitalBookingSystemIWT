// components/appointments.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service.implemented';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.css',
})
export class AppointmentsComponent implements OnInit {
    patient: string = 'Select';
    doctor: string = 'Select';
    appointmentDate: string = '';
    isEditing: boolean = false;
    editAppointmentId: string = '';
    DoctorsArray: any[] = [];
    PatientsArray: any[] = [];
    AppointmentsArray: any[] = [];

    constructor(private apiService: ApiService, 
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.apiService.getPatients().subscribe((res) => {
            this.PatientsArray = res;
        });
        this.apiService.getDoctors().subscribe((res) => {
            this.DoctorsArray = res;
        });
        this.apiService.getAppointments().subscribe((res) => {
            this.AppointmentsArray = res;
        });
    }

    clear(): void {
        this.patient = 'Select';
        this.doctor = 'Select';
        this.appointmentDate = '';
    }

    onEditAppointment(id: string): void {
        const index = this.AppointmentsArray.findIndex(
            (appointment) => appointment._id === id
        );
        const appointment = this.AppointmentsArray[index];
        this.patient = appointment['patient'];
        this.doctor = appointment['doctor'];
        this.appointmentDate = new Date
            (appointment['appointmentDate']).toISOString().slice(0, 10);
        this.isEditing = true;
        this.editAppointmentId = id;
    }

    onDeleteAppointment(id: string): void {
        this.apiService.deleteAppointment(id).subscribe((res) => {
            this.AppointmentsArray = this.AppointmentsArray.filter(
                (appointment) => appointment._id !== id
            );
            this.toastr.success('Appointment deleted successfully!', 'Success!');
        });
    }

    onAddClick(): void {
        const data = {
            patient: this.patient,
            doctor: this.doctor,
            appointmentDate: this.appointmentDate,
        };

        this.apiService.addAppointment(data).subscribe({
            next: (res) => {
                this.AppointmentsArray.push(res);
                this.clear();
                this.toastr.success('New Appointment added successfully', 'Success!');
            },
            error: (err) => {
                this.toastr.error('Failed to add appointment', 'Error!');
            }
        });
    }

    onUpdateClick(): void {
        const data = {
            patient: this.patient,
            doctor: this.doctor,
            appointmentDate: this.appointmentDate,
        };

        this.apiService
            .updateAppointment(this.editAppointmentId, data)
            .subscribe({
                next: (res) => {
                    this.AppointmentsArray = this.AppointmentsArray.filter(
                        (appointment) => appointment._id !== this.editAppointmentId
                    );
                    this.AppointmentsArray.push(res);
                    this.editAppointmentId = '';
                    this.isEditing = false;
                    this.toastr.success(
                        'Appointment details updated successfully',
                        'Success!'
                    );
                    this.clear();
                },
                error: (err) => {
                    this.toastr.error('Failed to update appointment', 'Error!');
                }
            });
    }
}
