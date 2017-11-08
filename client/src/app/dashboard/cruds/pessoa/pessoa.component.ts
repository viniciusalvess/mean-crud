import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { MenuItem, Message } from 'primeng/primeng';
import { ContextMenu } from 'primeng/primeng';
import {ActivatedRoute, Router} from '@angular/router';
import {MsgService} from '../../../services/msg.service';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  providers: [MsgService, MessageService]
})
export class PessoaComponent implements OnInit {
  private posts: any;
  private pessoas: any;
  private selectedPessoa: any;
  private items: MenuItem[];
  private msgs: Message[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private msgService: MsgService
  ) { }

  ngOnInit() {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts => {
    //   console.log(posts);
    //   // this.posts = posts;
    // }, (errors) => {
    //   console.log(errors);
    // });

    this.msgService.success(this.route.snapshot.params['message']);
    console.log( this.route.snapshot.params['message']);


    // this.route
    //   .data
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     console.log(params[0]);
    //   });

    this.http.get('/api/pessoa/index').subscribe(people => {
      this.pessoas = people;
    }, (errors) => {
      console.log(errors);
    });

    this.items = [
      {label: 'Visualisar', icon: 'fa-search',
        command: (event) => {
          this.router.navigateByUrl('/dashboard/principal/pessoa/' + this.selectedPessoa._id  + '/edit');
        }
      },
      {label: 'Excluir', icon: 'fa-close', command: (event) => console.log(this.selectedPessoa)}
    ];
  }

}
