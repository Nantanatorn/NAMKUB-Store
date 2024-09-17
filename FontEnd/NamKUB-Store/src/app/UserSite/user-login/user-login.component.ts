import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userRole: string | null = null; // ประกาศตัวแปร userRole

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    const loginData = { username: this.username, password: this.password };

    this.http.post<{ token: string, payload: any }>('http://localhost:3000/login', loginData)
      .subscribe({
        next: (response) => {
          // console.log('API Response:', response);
          // if (response.token) {
          //   localStorage.setItem('token', response.token);
          //   localStorage.setItem('payload', JSON.stringify(response.payload));

          //   // ดึง payload จาก localStorage และเข้าถึง role
          //   const payloadString = localStorage.getItem('payload');
          //   if (payloadString) {
          //     const payload = JSON.parse(payloadString);
          //     this.userRole = payload.user.role; // เข้าถึง role ของผู้ใช้
          //     console.log('User Role:', this.userRole);
          //   }
          //   this.router.navigate(['/home']); // Navigate to the home page after successful login
          // }
          // this.router.navigate(['/about-us']);
          console.log('API Response:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('payload', JSON.stringify(response.payload));

            // ดึง payload จาก localStorage และเข้าถึง role
            const payloadString = localStorage.getItem('payload');
            if (payloadString) {
              const payload = JSON.parse(payloadString);
              this.userRole = payload.user.role; // เข้าถึง role ของผู้ใช้
              console.log('User Role:', this.userRole);
            }

            // นำทางไปที่หน้า home
            this.router.navigate(['/home']).then(() => {
              // เมื่อการนำทางเสร็จสิ้น สามารถทำสิ่งที่ต้องการเพิ่มเติมที่นี่ถ้าต้องการ
            });

            return; // ยุติการทำงานหลังจากการนำทาง
          }

          // จัดการกรณีที่ไม่มี token ใน response
          this.router.navigate(['/about-us']);
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
}


