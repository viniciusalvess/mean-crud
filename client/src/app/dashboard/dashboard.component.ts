import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
  }

  onTesteToken() {
    this._http.post('/api/users/test', {nome: 'Vinicius', idade: 30 })
      .subscribe(data => {
        console.log(data);
      });
  }

  onLogOut() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }
}
