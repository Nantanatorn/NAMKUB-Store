// import { Component , OnInit} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent implements OnInit{
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   userRole: string | null = null; // ประกาศตัวแปร userRole

//   type:string = "password";
//   isText:boolean = false;
//   eyeIcon : string="bi bi-eye-slash-fill";
  

//   constructor(private http: HttpClient, private router: Router) { }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   onLogin(): void {
//     if (!this.username || !this.password) {
//       this.errorMessage = 'Username and password are required';
//       return;
//     }

//     const loginData = { username: this.username, password: this.password };

//     this.http.post<{ token: string, payload: any }>('http://localhost:3000/login', loginData)
//       .subscribe({
//         next: (response) => {
//           console.log('API Response:', response);
//           if (response.token) {
//             localStorage.setItem('token', response.token);
//             localStorage.setItem('payload', JSON.stringify(response.payload));

//             // ดึง payload จาก localStorage และเข้าถึง role
//             const payloadString = localStorage.getItem('payload');
//             if (payloadString) {
//               const payload = JSON.parse(payloadString);
//               this.userRole = payload.user.role; // Access the user's role
//               console.log('User Role:', this.userRole);

//               // Navigate based on the user's role
//               if (this.userRole === 'admin') {
//                 this.router.navigate(['/AdminHome']).then(() => {
//                   // Do additional actions after navigation if needed
//                 });
//               } else if (this.userRole === 'customer') {
//                 this.router.navigate(['/home']).then(() => {
//                   // Do additional actions after navigation if needed
//                 });
//               }

//               return; // End function execution after navigation
//             }
//           }

//           // จัดการกรณีที่ไม่มี token ใน response
//           this.router.navigate(['/login']);
//         },
//         error: (error) => {
//           if (error.status === 401) {
//             this.errorMessage = 'Invalid username or password';
//           } else {
//             this.errorMessage = 'Server error';
//           }
//         }
//       });
//   }
//   hideShowPass(){
//     this.isText = !this.isText;
//     this.isText ? this.eyeIcon="bi bi-eye-fill" : this.eyeIcon = "bi bi-eye-slash-fill";
//     this.isText ? this.type = "text" : this.type = "password";
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // นำเข้า AuthService

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userRole: string | null = null; // ประกาศตัวแปร userRole

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi bi-eye-slash-fill";

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // ตรวจสอบว่า login ไว้หรือยัง
    const token = localStorage.getItem('token');
    if (token) {
      this.userRole = this.authService.getRole();
      if (this.userRole === 'admin') {
        this.router.navigate(['/AdminHome']);
      } else if (this.userRole === 'customer') {
        this.router.navigate(['/home']);
      }
    }
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    const loginData = { username: this.username, password: this.password };

    this.http.post<{ token: string }>('http://localhost:3000/login', loginData)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          if (response.token) {
            // ใช้ AuthService ในการจัดการ token
            this.authService.login(response.token);

            // ดึง role จาก token ที่ถอดรหัสแล้ว
            this.userRole = this.authService.getRole();
            console.log('User Role:', this.userRole);

            // Navigate based on the user's role
            if (this.userRole === 'admin') {
              this.router.navigate(['/adminhome']);
            } else if (this.userRole === 'customer') {
              this.router.navigate(['/home']);
            }
          } else {
            this.errorMessage = 'Login failed. No token received.';
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = 'Server error';
          }
        }
      });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi bi-eye-fill" : this.eyeIcon = "bi bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
