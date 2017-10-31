import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Response} from '@angular/http';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {Observable} from 'rxjs/Observable';
import {Message} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';

// import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  id: any;
  loginFailMsg: String;
  paramsSub: any;
  frmLogin: FormGroup;
  msgs: Message[] = [];

  constructor(private _auth: AuthService, private _formBuilder: FormBuilder, private _router: Router, private messageService: MessageService) {}

  printConsole(msg: String) {
    console.log(msg);
  }

  ngOnInit() {
    this.frmLogin = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });


    // this.http.get('http://localhost:4200/users/test',{responseType: 'text'}).subscribe(data => {
    //   // Read the result field from the JSON response.
    //   // console.log('data: ', data);
    //   this.name = data;
    // });

    // this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  onSubmit() {
    if (!this.frmLogin.valid) {
      return false;
    }
    this._auth.login(this.frmLogin.value.email, this.frmLogin.value.password)
      .subscribe((user) => {
        this._router.navigateByUrl('/dashboard');
      }, err => this.messageService.add({severity: 'warn', summary: 'Login', detail: err._body }));
  }

  ngOnDestroy() {
    // this.paramsSub.unsubscribe();
  }

}
