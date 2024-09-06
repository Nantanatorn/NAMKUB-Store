import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegComponent } from './User/user-reg/user-reg.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderUserComponent } from './header-user/header-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegComponent,
    AdminLoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
