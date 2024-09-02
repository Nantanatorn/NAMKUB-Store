import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegComponent } from './User/user-reg/user-reg.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
