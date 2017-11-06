import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MenuItem, Message } from 'primeng/primeng';
import { ContextMenu } from 'primeng/primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private posts: any;
  private pessoas: any;
  private selectedPessoa: any;
  private items: MenuItem[];
  private msgs: Message[];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts => {
    //   console.log(posts);
    //   // this.posts = posts;
    // }, (errors) => {
    //   console.log(errors);
    // });

    this.http.get('/api/pessoa/list').subscribe(people => {
      console.log(people);
      this.pessoas = people;
    }, (errors) => {
      console.log(errors);
    });

    this.items = [
      {label: 'Visualisar', icon: 'fa-search',
        command: (event) => {
          this.http.post('/api/pessoa/edit', {id: this.selectedPessoa}).subscribe((pes: any) => {
            console.log(pes);
            this.router.navigateByUrl('/dashboard/principal/pessoa/' + pes._id + '/edit');
            // this.posts = posts;
          }, (errors) => {
            console.log(errors);
          });
          // console.log(this.selectedPessoa);
        }
      },
      {label: 'Excluir', icon: 'fa-close', command: (event) => console.log(this.selectedPessoa)}
    ];
  }

}
