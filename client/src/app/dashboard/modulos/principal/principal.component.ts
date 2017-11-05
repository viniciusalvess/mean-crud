import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Cadastros',
        items: [{
          label: 'Pessoa',
          routerLink : '/dashboard/principal/pessoa'
          // icon: 'fa-plus',
          // items: [
          //   {label: 'Project'},
          //   {label: 'Other'},
          // ]
        }
        // ,{label: 'Open'},
        //   {label: 'Quit'}
        ]
      }
      // ,
      // {
      //   label: 'Edit',
      //   icon: 'fa-edit',
      //   items: [
      //     {label: 'Undo', icon: 'fa-mail-forward'},
      //     {label: 'Redo', icon: 'fa-mail-reply'}
      //   ]
      // }
    ];
  }

}
