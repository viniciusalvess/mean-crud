import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserToken} from '../../dtos/UserToken.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: UserToken;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.user = this._authService.getToken();
  }

  onLogOut() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }

}
