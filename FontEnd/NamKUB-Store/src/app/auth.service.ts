
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Adjust URL if necessary
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();

  constructor(private router: Router) {
    // Initialize the username from payload in localStorage if available
    // const payload = localStorage.getItem('payload');
    // if (payload) {
    //   try {
    //     const parsedPayload = JSON.parse(payload);
    //     const username = parsedPayload.user?.username || null;
    //     this.usernameSubject.next(username);
    //   } catch (error) {
    //     console.error('Error parsing payload from localStorage:', error);
    //   }
    // }
    const token =localStorage.getItem('token');
    if(token){
      const payload =this.decodeToken(token);
      const username =payload?.user?.username || null;
      this.usernameSubject.next(username);
    }
  }

  // Simulate user login and store token and payload
  // login(token: string, payload: any): void {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('payload', JSON.stringify(payload));
  //   const username = payload.user?.username || null;
  //   this.usernameSubject.next(username);
  // }
  login(token:string):void{
    localStorage.setItem('token',token);
    const payload =this.decodeToken(token);
    const username =payload?.user?.username || null;
    this.usernameSubject.next(username);
  }

  // Simulate user logout
  logout(): void {
    localStorage.removeItem('token');
    this.usernameSubject.next(null);
    this.router.navigate(['/']); // Redirect to home or login page
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Return true if there is a token
  }

  // Get the role of the user from the payload in localStorage
  getRole(): string | null {
   
    const token =localStorage.getItem('token');
    if(token){
      const payload =this.decodeToken(token);
      return payload?.user?.role||null;
    }
    return null;
  }
  getUsername():string |null{
    const token=localStorage.getItem('token');
    if(token){
      const payload =this.decodeToken(token);
      return payload?.user?.username||null;
    }
    return null;
  }

  // Decode JWT token
  private decodeToken(token: string):any{
    try{
      return jwtDecode(token);

    }catch(error){
      console.error('Failed to decode token',error);
      return null;
    }
  }
}

