import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../../model/products';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user = new BehaviorSubject<Users[]>([]);
  editprofileform:FormGroup;

  constructor( private apiservice: NAMKUBAPIService,
                private http : HttpClient,
                private router:Router,private fb: FormBuilder){
    this.editprofileform = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      picture: [null], 
    });
}
onSubmit(){
  if(this.editprofileform.value){
    const formData = {
      firstname:this.editprofileform.value.firstname,
      lastname:this.editprofileform.value.lastname,
      phone:this.editprofileform.value.phone,
      username:this.editprofileform.value.username,
      email:this.editprofileform.value.email,
      picture: this.editprofileform.value.picture
      
    };
    this.http.put('http://localhost:3000/users', formData).subscribe({
    next:(response)=> {
      console.log('Profile saved successfully!',response);
      this.saveProfile();
     
    },
    error:(error) =>{
      console.error('Error save profile',error);
      console.log(this.editprofileform.errors);
      console.log(this.editprofileform.value);
    }
  });
  }else{
    console.log('Form is not valid');
    console.log(this.editprofileform.errors);
    console.log(this.editprofileform.value);
  }
}
  @Input() users: { firstname?: string; lastname?: string; phone?: string; username?: string; email?: string } = {}; 
  @Output() onConfirm = new EventEmitter<any>(); 

  saveProfile(){
    if (this.users.firstname && this.users.lastname && this.users.phone && this.users.username && this.users.email) {
      this.onConfirm.emit(this.users);
  }
  }
  resetForm(){
    this.editprofileform.reset;
  }

  editprofile(){
    this.editprofileform.patchValue({
      
      firstname: this.users.firstname,
      lastname: this.users.lastname,
      phone: this.users.phone,
      username: this.users.username,
      email: this.users.email,
      
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.editprofileform.patchValue({
        picture: input.files[0].name
      });
    }
  }

}

  
  // saveProfile(): void {
  //   alert('Profile saved successfully!\n' +
  //     `First Name: ${this.user.firstname}\n` +
  //     `Last Name: ${this.user.lastname}\n` +
  //     `Phone: ${this.user.phone}\n` +
  //     `Username: ${this.user.username}\n` +
  //     `Email: ${this.user.email}`);
  // }

  // resetForm(): void {
  //   this.user = {
  //     firstname: 'Jane',
  //     lastname: 'Doe',
  //     phone: '0123456789',
  //     username: 'johndoe',
  //     email: 'janedoe@example.com',
  //     password: 'password1234'
  //   };
  //   alert('Form reset to default values!');
  // }

