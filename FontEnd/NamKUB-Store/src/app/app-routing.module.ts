import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegComponent } from './User/user-reg/user-reg.component';

const routes: Routes = [
  {path: '',component: UserLoginComponent},
  {path: 'register',component: UserRegComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
