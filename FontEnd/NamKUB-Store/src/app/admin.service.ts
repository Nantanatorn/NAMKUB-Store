import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private adminUrl = 'http://localhost:3000/deliver_register'; // URL for admin registration API

  constructor(private http: HttpClient) { }

  // Function for sending admin registration data
  registerAdmin(adminData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Sending admin registration request to:', this.adminUrl);
    console.log('Request body:', adminData);

    return this.http.post(this.adminUrl, adminData, { headers }).pipe(
      tap(response => {
        console.log('Admin registration response:', response);
      }),
      catchError(error => {
        console.error('Admin registration error:', error);
        return throwError(error);
      })
    );
  }
}