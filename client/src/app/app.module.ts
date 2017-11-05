import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  InputTextModule, PasswordModule, ButtonModule, DataTableModule, DialogModule, FieldsetModule, MessagesModule, GrowlModule,
  TabViewModule, MenubarModule, MenuItem, SharedModule, ContextMenuModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from './util/interceptors/token_interceptor';
import {AuthService} from './services/auth.service';
import {AuthenticatedGuard} from './util/guards/authenticated.guard';
import {AuthInterceptor} from './util/interceptors/auth.interceptor';
import {PrincipalComponent} from './dashboard/modulos/principal/principal.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { PessoaComponent } from './dashboard/cruds/pessoa/pessoa.component';

const appRoutes = [
  { path : 'index', component : AppComponent },
  { path : 'dashboard', component : DashboardComponent, canActivate: [AuthenticatedGuard],
    children:
      [
        { path : 'principal', component: PrincipalComponent,
          children:
            [
              { path : 'pessoa', component: PessoaComponent }
            ]
        }

      ]
  },
  {
    path : 'login',
    component: LoginComponent,
    // children : [
    //   { path : 'logina', component: LoginfilhoaComponent },
    //   { path : 'loginb', component: LoginfilhobComponent },
    // ]
  },

  {
    path : 'dashboard/principal',
    component: PrincipalComponent,
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
    PrincipalComponent,
    NavbarComponent,
    PessoaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    InputTextModule, ButtonModule, DataTableModule, DialogModule, FieldsetModule, PasswordModule, MessagesModule, GrowlModule,
    TabViewModule, MenubarModule, DataTableModule, SharedModule, ContextMenuModule
  ],
  providers: [AuthService, AuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
