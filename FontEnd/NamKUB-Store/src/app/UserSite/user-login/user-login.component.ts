import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  // fetch data 
  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    const loginData = { username: this.username, password: this.password };

    this.http.post<{ message: string }>('http://localhost:3000/api/login', loginData)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.router.navigate(['/home']); // Navigate to the home page after successful login
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
