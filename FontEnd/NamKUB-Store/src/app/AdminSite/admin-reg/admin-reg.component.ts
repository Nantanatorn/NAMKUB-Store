import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../admin.service'; // Ensure this path is correct
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.component.html',
  styleUrls: ['./admin-reg.component.css']
})
export class AdminRegComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50)]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    console.log('Form submit triggered');
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);

      // Preparing admin registration data
      const adminData = this.registerForm.value;

      // Use the registerAdmin method to register an admin
      this.registerService.registerAdmin(adminData).subscribe(
        response => {
          Swal.fire({
            title: "สมัคร สำเร็จ!",
            text: "sign up successful",
            icon: "success"
          });
          console.log('Admin registration successful', response);
        },
        error => {
          Swal.fire({
            title: "สมัคร ไม่สำเร็จ",
            text: "sign up failed",
            icon: "error"
          });
          console.error('Admin registration error', error);
        }
      );
      this.registerForm.reset();
    } else {
      Swal.fire({
        title: "กรอกข้อมูลไม่ถูกต้อง",
        text: "form is invalid",
        icon: "error"})
      console.log('Form is invalid');
    }
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }
}
