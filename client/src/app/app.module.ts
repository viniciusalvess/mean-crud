import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  InputTextModule, PasswordModule, ButtonModule, DataTableModule, DialogModule, FieldsetModule, MessagesModule, GrowlModule
} from 'primeng/primeng';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';
import {HttpService} from './_services/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token_interceptor';
import {AuthService} from './_services/auth.service';

const appRoutes = [
  { path : 'index', component : AppComponent },
  { path : 'dashboard', component : DashboardComponent },
  {
    path : 'login',
    component: LoginComponent,
    // children : [
    //   { path : 'logina', component: LoginfilhoaComponent },
    //   { path : 'loginb', component: LoginfilhobComponent },
    // ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    InputTextModule, ButtonModule, DataTableModule, DialogModule, FieldsetModule, PasswordModule, MessagesModule, GrowlModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
