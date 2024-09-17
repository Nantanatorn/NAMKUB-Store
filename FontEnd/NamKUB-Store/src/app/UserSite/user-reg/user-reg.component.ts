// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../auth.service';

// @Component({
//   selector: 'app-user-reg',
//   templateUrl: './user-reg.component.html',
//   styleUrls: ['./user-reg.component.css']
// })
// export class UserRegComponent {  // Make sure the class name matches the import
//   registerForm: FormGroup;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.registerForm = this.fb.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       username:['',Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//       phone: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       const formValues = this.registerForm.value;
//       if (formValues.password !== formValues.confirmPassword) {
//         alert('Passwords do not match.');
//         return;
//       }

//       this.authService.register(formValues).subscribe(
//         response => {
//           alert('Registration successful.');
//           // Handle success (e.g., redirect to login page)
//         },
//         error => {
//           alert('Registration failed: ' + error.message);
//           // Handle error
//         }
//       );
//     }
//   }
// }
// import { Component } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 //import { RegisterService } from '../../register.service';

// @Component({
//   selector: 'app-user-reg',
//   templateUrl: './user-reg.component.html',
//   styleUrls: ['./user-reg.component.css']
// })
// export class UserRegComponent {
//   registerForm: FormGroup;
//   submitted = false;
//   successMessage = '';
//   errorMessage = '';

//   constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
//     this.registerForm = this.formBuilder.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//       phone: ['', Validators.required]
//     }, {
//       validator: this.passwordMatchValidator // ฟังก์ชันสำหรับตรวจสอบว่า password กับ confirm password ตรงกัน
//     });
//   }

//   // ตรวจสอบให้ password ตรงกับ confirm password
//   passwordMatchValidator(formGroup: FormGroup) {
//     const password = formGroup.get('password');
//     const confirmPassword = formGroup.get('confirmPassword');
//     return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
//   }

//   // ฟังก์ชันที่ทำงานเมื่อกดปุ่มลงทะเบียน
//   onSubmit() {
//     this.submitted = true;

//     // หยุดทำงานถ้าฟอร์มไม่ถูกต้อง
//     if (this.registerForm.invalid) {
//       return;
//     }

//     // ส่งข้อมูลไปที่ backend
//     this.registerService.registerUser(this.registerForm.value).subscribe(
//       (response) => {
//         this.successMessage = response.message;
//         this.errorMessage = '';
//       },
//       (error) => {
//         this.errorMessage = error.error.message || 'An error occurred. Please try again.';
//         this.successMessage = '';
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../register.service'; // อย่าลืมนำเข้า service

import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
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

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      this.registerService.registerUser(this.registerForm.value).subscribe(
        response => {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Custom validator to match password and confirmPassword
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }
}
