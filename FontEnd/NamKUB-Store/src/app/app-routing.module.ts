import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './AdminSite/admin-login/admin-login.component';
import { AboutUsComponent } from './UserSite/about-us/about-us.component';
import { ContactComponent } from './UserSite/contact/contact.component';
import { HomeComponent } from './UserSite/home/home.component';
import { ProductComponent } from './UserSite/product/product.component';
import { UserLoginComponent } from './UserSite/user-login/user-login.component';
import { UserRegComponent } from './UserSite/user-reg/user-reg.component';
import { CartComponent } from './UserSite/cart/cart.component';


const routes: Routes = [
  {path: '',component: UserLoginComponent},
  {path: 'register',component: UserRegComponent},
  {path: 'AdminRegister',component: AdminLoginComponent},
  {path: 'home',component:HomeComponent},
  {path: 'products',component:ProductComponent},
  {path: 'contact',component:ContactComponent},
  {path: 'about-us',component:AboutUsComponent},
  {path: 'home',component:HomeComponent},
  {path: 'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
