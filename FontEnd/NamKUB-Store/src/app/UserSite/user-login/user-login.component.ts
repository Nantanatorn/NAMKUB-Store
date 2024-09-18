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
          console.log('API Response:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('payload', JSON.stringify(response.payload));

            // ดึง payload จาก localStorage และเข้าถึง role
            const payloadString = localStorage.getItem('payload');
            if (payloadString) {
              const payload = JSON.parse(payloadString);
              this.userRole = payload.user.role; // Access the user's role
              console.log('User Role:', this.userRole);

              // Navigate based on the user's role
              if (this.userRole === 'admin') {
                this.router.navigate(['/AdminHome']).then(() => {
                  // Do additional actions after navigation if needed
                });
              } else if (this.userRole === 'customer') {
                this.router.navigate(['/home']).then(() => {
                  // Do additional actions after navigation if needed
                });
              }

              return; // End function execution after navigation
            }
          }

          // จัดการกรณีที่ไม่มี token ใน response
          this.router.navigate(['/login']);
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


