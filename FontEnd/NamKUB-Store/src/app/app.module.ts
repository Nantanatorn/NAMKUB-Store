import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD

=======
>>>>>>> main
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutUsComponent } from './UserSite/about-us/about-us.component';
import { ContactComponent } from './UserSite/contact/contact.component';
import { FooterComponent } from './UserSite/footer/footer.component';
import { HeaderUserComponent } from './UserSite/header-user/header-user.component';
import { HomeComponent } from './UserSite/home/home.component';
import { ProductComponent } from './UserSite/product/product.component';
import { UserLoginComponent } from './UserSite/user-login/user-login.component';
import { UserRegComponent } from './UserSite/user-reg/user-reg.component';
import { CartComponent } from './UserSite/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegComponent,
    AboutUsComponent,
    ProductComponent,
    ContactComponent,
    FooterComponent,
    HeaderUserComponent,
    HomeComponent,
    CartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
