import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service.implemented';

interface Doctor {
  _id: string;
  name: string;
  speciality: string;
}

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  name: string = '';
  speciality: string = 'Select';
  isEditing: boolean = false;
  editDoctorId: string = '';
  DoctorsArray: Doctor[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.apiService.getDoctors().subscribe({
      next: (res: Doctor[]) => {
        this.DoctorsArray = res;
      },
      error: (err: Error) => {
        this.toastr.error('Failed to load doctors', 'Error!');
      }
    });
  }

  clear(): void {
    this.name = '';
    this.speciality = 'Select';
  }

  onEditDoctor(id: string): void {
    const doctor = this.DoctorsArray.find(d => d._id === id);
    if (doctor) {
      this.name = doctor.name;
      this.speciality = doctor.speciality;
      this.isEditing = true;
      this.editDoctorId = id;
    }
  }

  onDeleteDoctor(id: string): void {
    this.apiService.deleteDoctor(id).subscribe({
      next: () => {
        this.DoctorsArray = this.DoctorsArray.filter(d => d._id !== id);
        this.toastr.success('Doctor deleted successfully!', 'Success!');
      },
      error: (err: Error) => {
        this.toastr.error('Failed to delete doctor', 'Error!');
      }
    });
  }

  onAddClick(): void {
    const data = {
      name: this.name,
      speciality: this.speciality,
    };
    this.apiService.addDoctor(data).subscribe({
      next: (res: Doctor) => {
        this.DoctorsArray.push(res);
        this.clear();
        this.toastr.success('New Doctor added successfully', 'Success!');
      },
      error: (err: Error) => {
        this.toastr.error('Failed to add doctor', 'Error!');
      }
    });
  }

  onUpdateClick(): void {
    const data = {
      name: this.name,
      speciality: this.speciality,
    };
    this.apiService.updateDoctor(this.editDoctorId, data).subscribe({
      next: (res: Doctor) => {
        this.DoctorsArray = this.DoctorsArray.filter(d => d._id !== this.editDoctorId);
        this.DoctorsArray.push(res);
        this.editDoctorId = '';
        this.isEditing = false;
        this.toastr.success('Doctor details updated successfully', 'Success!');
        this.clear();
      },
      error: (err: Error) => {
        this.toastr.error('Failed to update doctor', 'Error!');
      }
    });
  }
}
