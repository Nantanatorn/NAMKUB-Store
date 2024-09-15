import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent {  // Make sure the class name matches the import
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      if (formValues.password !== formValues.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      this.authService.register(formValues).subscribe(
        response => {
          alert('Registration successful.');
          // Handle success (e.g., redirect to login page)
        },
        error => {
          alert('Registration failed: ' + error.message);
          // Handle error
        }
      );
    }
  }
}