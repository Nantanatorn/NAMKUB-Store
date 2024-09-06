import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegComponent } from './User/user-reg/user-reg.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',component: UserLoginComponent},
  {path: 'register',component: UserRegComponent},
  {path: 'AdminRegister',component: AdminLoginComponent},
  {path: 'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
